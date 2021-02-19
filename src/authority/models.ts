export type PasswordLoginModel = {
  email: string;
  password: string;
};

export type GoogleLoginModel = {
  idToken: string;
};

export type NewUserModel = {
  username?: string;
  email: string;
  password: string;
  givenName?: string;
  familyName?: string;
};

export type TokensModel = {
  bearerToken: string;
  refreshToken: string;
};

export type EmailNotVerifiedModel = {
  user: {
    email: string;
  };
};

export type ErrorModel = {
  message: string;
};
