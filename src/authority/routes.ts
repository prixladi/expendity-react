const _TokenPassword = 'token/password';
const _TokenRefresh = 'token/refresh';
const _TokenGoogle = 'token/google';
const _Users = 'users';
const _UserCurrent = 'users/current';
const _Emails = 'emails';
const _PasswordReset = 'passwordReset';
const _Verification = 'verification';
const _Verified = 'verified';

const _EmailVerification = (email: string): string => `${_Emails}/${email}/${_Verification}`;
const _EmailPasswordReset = (email: string): string => `${_Emails}/${email}/${_PasswordReset}`;
const _EmailVerified = (email: string): string => `${_Emails}/${email}/${_Verified}`;
const _UserPasswordReset = (id: string): string => `${_Users}/${id}/${_PasswordReset}`;

export {
  _TokenPassword,
  _TokenRefresh,
  _TokenGoogle,
  _Users,
  _UserCurrent,
  _Emails,
  _PasswordReset,
  _Verification,
  _Verified,
  _EmailVerification,
  _EmailPasswordReset,
  _EmailVerified,
  _UserPasswordReset,
};
