export enum ApplicationServiceURL {
  Auth = 'http://localhost:3333/api/auth',
  User = 'http://localhost:3333/api/user',
  Training = 'http://localhost:3000/api/trainings',
  Order = 'http://localhost:3000/api/orders',
  Email = 'http://localhost:3335/api/email',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
