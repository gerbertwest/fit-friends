export enum AppRoute {
  SignIn = '/login',
  Intro = '/',
  Registry = '/registry',
  Main = '/main',
  CoachAccount = '/coachAccount'

}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Data = 'DATA',
  Main = 'MAIN',
  User = 'USER',
}

export enum APIRoute {
  Login = '/users/login',
  Check = '/users/check',

}

export const REDIRECT_ACTION_NAME = 'main/redirectToRoute';

export enum UserRole {
  Admin = 'Тренер',
  User = 'Пользователь',
}
