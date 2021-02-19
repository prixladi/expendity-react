import jwt_decode from 'jwt-decode';
import { getBearerToken, getRefreshToken } from './helpers';

type UserProfile = {
  id: string;
  email: string;
  tokenExpire: number;
  username?: string;
  givenName?: string;
  familyName?: string;
};

type Tokens = {
  bearerToken: string | null;
  refreshToken: string | null;
};

const idClaim = 'name';
const usernameClaim = 'username';
const emailClaim = 'email';
const givenNameClaim = 'given_name';
const familyNameClaim = 'family_name';
const expirationClaim = 'exp';

const getUserProfile = (): UserProfile | null => {
  const tokens = getTokens();
  if (!tokens.bearerToken) {
    return null;
  }

  const token = jwt_decode(tokens.bearerToken) as { [claim: string]: string };

  return {
    id: token[idClaim],
    email: token[emailClaim],
    username: token[usernameClaim],
    givenName: token[givenNameClaim],
    familyName: token[familyNameClaim],
    tokenExpire: parseInt(token[expirationClaim]),
  };
};

const isUserLoggedIn = (): boolean => localStorage.getItem('bearerToken') !== null;

const getTokens = (): Tokens => {
  return {
    bearerToken: getBearerToken(),
    refreshToken: getRefreshToken(),
  };
};

export type { UserProfile, Tokens };
export { getTokens, getUserProfile, isUserLoggedIn };
