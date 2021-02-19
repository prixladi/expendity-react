import { TokensModel } from './models';

const getBearerToken = (): string | null => localStorage.getItem('bearerToken');

const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

const setTokens = (tokens: TokensModel): void => {
  localStorage.setItem('refreshToken', tokens.refreshToken);
  localStorage.setItem('bearerToken', tokens.bearerToken);
};

const unsetTokens = (): void => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('bearerToken');
};

function pathJoin(...parts: string[]): string {
  const replace = new RegExp('/{1,}', 'g');
  return parts.join('/').replace(replace, '/').replace(':/', '://');
}

export { getBearerToken, getRefreshToken, setTokens, unsetTokens, pathJoin };
