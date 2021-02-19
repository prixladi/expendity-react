import {
  _TokenGoogle,
  _TokenPassword,
  _Users,
  _UserPasswordReset,
  _EmailVerification,
  _EmailPasswordReset,
  _EmailVerified,
} from './routes';
import { EmailNotVerifiedModel, ErrorModel, GoogleLoginModel, NewUserModel, PasswordLoginModel, TokensModel } from './models';
import { setTokens, unsetTokens } from './helpers';
import { StatusCodes } from 'http-status-codes';
import api, { tryRefreshToken } from './api';
import { Config } from './config';
import * as utils from './utils';

const { BAD_REQUEST, NOT_FOUND, CONFLICT } = StatusCodes;

const any200 = (...additionCodes: number[]) => (status: number) => {
  const valid = status >= 200 && status < 300;
  return valid || additionCodes.length === 0 || additionCodes.includes(status);
};

type Result<TData = void> = {
  ok: boolean;
  status?: number;
  data?: TData;
};

type Callbacks = {
  onError: (err: unknown) => Promise<void>;
  onUnauthorized: () => Promise<void>;
};

type Manager = {
  register: (model: NewUserModel, callbacks: Callbacks) => Promise<Result<ErrorModel | void>>;
  passwordLogin: (model: PasswordLoginModel, callbacks: Callbacks) => Promise<Result<void | EmailNotVerifiedModel>>;
  googleLogin: (model: GoogleLoginModel, callbacks: Callbacks) => Promise<Result<void>>;
  sendForgottenPassword: (email: string, callbacks: Callbacks) => Promise<Result<void>>;
  resetPassword: (passwordToken: string, id: string, password: string, callbacks: Callbacks) => Promise<Result<void>>;
  sendAccountVerification: (email: string, callbacks: Callbacks) => Promise<Result<void>>;
  getUserProfile: () => utils.UserProfile | null;
  isUserLoggedIn: () => boolean;
  verifyAccount: (email: string, token: string, callbacks: Callbacks) => Promise<Result<void>>;
  refreshToken: (callbacks: Callbacks) => Promise<boolean>;
  logout: () => Promise<void>;
  getTokens: () => utils.Tokens;
};

const createManager = (getConfig: () => Config): Manager => {
  const register = async function (model: NewUserModel, callbacks: Callbacks): Promise<Result<ErrorModel | void>> {
    const config = getConfig();
    const validateStatus = any200(CONFLICT);
    const result = await api.post(
      `${_Users}`,
      { ...model, clientId: config.clientId },
      { config, ...callbacks, validateStatusCode: validateStatus },
    );

    if (result?.status === CONFLICT) {
      const errorModel = (await result.json()) as ErrorModel;
      return {
        ok: result.ok,
        status: CONFLICT,
        data: errorModel,
      };
    }

    return {
      ok: result?.ok ?? false,
      status: result?.status,
    };
  };

  const passwordLogin = async (model: PasswordLoginModel, callbacks: Callbacks): Promise<Result<void | EmailNotVerifiedModel>> => {
    const config = getConfig();
    const validateStatus = any200(BAD_REQUEST);
    const result = await api.post(`${_TokenPassword}`, model, {
      config,
      ...callbacks,
      validateStatusCode: validateStatus,
    });

    if (result?.ok) {
      const tokens = (await result?.json()) as TokensModel;
      setTokens(tokens);
    }

    return { ok: result?.ok ?? false, status: result?.status };
  };

  const googleLogin = async (model: GoogleLoginModel, callbacks: Callbacks): Promise<Result<void>> => {
    const config = getConfig();
    const validateStatus = any200();
    const result = await api.post(`${_TokenGoogle}`, model, { config, ...callbacks, validateStatusCode: validateStatus });

    if (result) {
      const tokens = (await result.json()) as TokensModel;
      setTokens(tokens);
    }

    return { ok: result?.ok ?? false, status: result?.status };
  };

  const sendForgottenPassword = async (email: string, callbacks: Callbacks): Promise<Result<void>> => {
    const config = getConfig();
    const validateStatus = any200();
    const result = await api.patch(
      _EmailPasswordReset(email),
      { clientId: config.clientId },
      { config, ...callbacks, validateStatusCode: validateStatus },
    );

    return {
      ok: result?.ok ?? false,
      status: result?.status,
    };
  };

  const resetPassword = async (passwordToken: string, id: string, password: string, callbacks: Callbacks): Promise<Result<void>> => {
    const config = getConfig();
    const validateStatus = any200(BAD_REQUEST, CONFLICT);
    const result = await api.patch(
      _UserPasswordReset(id),
      { password, passwordToken },
      { config, ...callbacks, validateStatusCode: validateStatus },
    );

    return {
      ok: result?.ok ?? false,
      status: result?.status,
    };
  };

  const sendAccountVerification = async (email: string, callbacks: Callbacks): Promise<Result<void>> => {
    const config = getConfig();
    const validateStatus = any200(NOT_FOUND, CONFLICT);
    const result = await api.patch(
      _EmailVerification(email),
      { clientId: config.clientId },
      { config, ...callbacks, validateStatusCode: validateStatus },
    );

    return {
      ok: result?.ok ?? false,
      status: result?.status,
    };
  };

  const verifyAccount = async (email: string, token: string, callbacks: Callbacks): Promise<Result<void>> => {
    const config = getConfig();
    const validateStatus = any200(BAD_REQUEST, NOT_FOUND, CONFLICT);
    const result = await api.put(_EmailVerified(email), { token }, { config, ...callbacks, validateStatusCode: validateStatus });

    return {
      ok: result?.ok ?? false,
      status: result?.status,
    };
  };

  const refreshToken = async (callbacks: Callbacks): Promise<boolean> => {
    const config = getConfig();
    return await tryRefreshToken({ config, ...callbacks, validateStatusCode: () => true });
  };

  const logout = () => {
    unsetTokens();
    return Promise.resolve();
  };

  return {
    register,
    passwordLogin,
    googleLogin,
    sendForgottenPassword,
    resetPassword,
    sendAccountVerification,
    verifyAccount,
    refreshToken,
    logout,
    ...utils,
  };
};

export type { Manager, Callbacks };
export default createManager;
