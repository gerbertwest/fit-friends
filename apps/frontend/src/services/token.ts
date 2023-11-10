const AUTH_A_TOKEN_KEY_NAME = 'fit-accessToken';
const AUTH_R_TOKEN_KEY_NAME = 'fit-refreshToken';


export type Token = string;

export const getToken = (): Token => {
  const accessToken = localStorage.getItem(AUTH_A_TOKEN_KEY_NAME);
  return accessToken ?? '';
};

export const saveToken = (accessToken: Token, refreshToken: Token): void => {
  localStorage.setItem(AUTH_A_TOKEN_KEY_NAME, accessToken);
  localStorage.setItem(AUTH_R_TOKEN_KEY_NAME, refreshToken);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_A_TOKEN_KEY_NAME);
};
