import { getRefreshToken, pathJoin, setTokens, unsetTokens } from './helpers';
import { TokensModel } from './models';
import { _TokenRefresh } from './routes';
import { StatusCodes } from 'http-status-codes';
import { Config } from './config';

type Methods = {
  post: (url: string, data: unknown, options: Options) => Promise<Response | null>;
  put: (url: string, data: unknown, options: Options) => Promise<Response | null>;
  patch: (url: string, data: unknown, options: Options) => Promise<Response | null>;
  get: (url: string, options: Options) => Promise<Response | null>;
  delete: (url: string, options: Options) => Promise<Response | null>;
};

type Options = {
  shouldAuth?: boolean;
  config: Config;
  validateStatusCode: (status: number) => boolean;
  onError: (err: unknown) => Promise<void>;
  onUnauthorized: () => Promise<void>;
};

const { UNAUTHORIZED } = StatusCodes;

const getHeaders = (shouldAuth?: boolean): string[][] => {
  const headers = [['Content-Type', 'application/json']];
  if (shouldAuth) {
    headers.push(['Authorization', `Bearer ${localStorage.getItem('bearerToken')}`]);
  }

  return headers;
};

const tryRefreshToken = async (options: Options): Promise<boolean> => {
  const token = getRefreshToken();
  if (!token) {
    return false;
  }

  try {
    const result = await fetch(pathJoin(options.config.url, _TokenRefresh), {
      method: 'post',
      body: JSON.stringify({ refreshToken: token }),
      headers: getHeaders(),
    });

    if (!result.ok) {
      throw new Error(`Unexpected status '${result.status}'.`);
    }

    const data = (await result.json()) as TokensModel;

    setTokens(data);
    return true;
  } catch (err) {
    await options.onError(err);
    unsetTokens();
    return false;
  }
};

const call = async (path: string, method: string, body: unknown, options: Options): Promise<Response | null> => {
  try {
    const bodyString = JSON.stringify(body);
    const url = pathJoin(options.config.url, path);

    let response = await fetch(url, {
      method,
      body: bodyString,
      headers: getHeaders(options.shouldAuth),
    });

    if (response.status === UNAUTHORIZED) {
      if (tryRefreshToken(options)) {
        response = await fetch(url, {
          method,
          body: bodyString,
          headers: getHeaders(options.shouldAuth),
        });
      } else {
        await options.onUnauthorized();
        return null;
      }
    }
    if (!options.validateStatusCode(response.status)) {
      throw new Error(`Server returned unexpected status code: '${response.status}'.`);
    }

    return response;
  } catch (err) {
    options.onError(err);
    return null;
  }
};

const methods: Methods = {
  post: (url: string, data: unknown, options: Options) => {
    return call(url, 'POST', data, options);
  },
  put: (url: string, data: unknown, options: Options) => {
    return call(url, 'PUT', data, options);
  },
  patch: (url: string, data: unknown, options: Options) => {
    return call(url, 'PATCH', data, options);
  },
  get: (url: string, options: Options) => {
    return call(url, 'GET', null, options);
  },
  delete: (url: string, options: Options) => {
    return call(url, 'DELETE', null, options);
  },
};

export { tryRefreshToken };
export default methods;
