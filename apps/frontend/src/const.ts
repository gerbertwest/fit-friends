export enum AppRoute {
  SignIn = '/login',
  Intro = '/',
  Registry = '/registry',
  Main = '/main',
  CoachAccount = '/coachAccount',
  UserId = ':id',
  QuestionaireUser = '/questionaireUser',
  QuestionaireCoach = '/questionaireCoach',
  MyTrainings = '/myTrainings',
  CreateTraining = '/createTraining',
  MyOrders = '/myOrders',
  MyFriends = '/myFriends',
  TrainingCatalog = '/catalog'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Training = 'TRAINING',
  User = 'USER',
}

export enum APIRoute {
  Login = '/users/login',
  Check = '/users/check',
  Registry = '/users/register',
  Avatar = '/users/avatar',
  UpdateUser = '/users/update',
  Certificates = '/users/certificate',
  Users = '/users',
  DeleteCertificate = '/users/deleteCertificate',
  MyTrainings = '/training/trainer',
  MyFriends = '/users/trainer/friends',
  Requests = 'users/request',
  TrainerOrders = 'order/trainer',
  CreateTraining = '/training',
  Video = '/training/video',
  Trainings = '/training',

}

export const REDIRECT_ACTION_NAME = 'main/redirectToRoute';

export enum UserRole {
  Admin = 'Тренер',
  User = 'Пользователь',
}

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export const LOCATIONS = ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'];
export const TRAINING_TYPES = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'];
export const LEVELS = ['новичок', 'любитель', 'профессионал'];
export const TRAINING_TIMES = ['10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин'];
export const SEX = ['мужской', 'женский', 'неважно'];
export const GENDERS = ['для мужчин', 'для женщин', 'для всех'];

export const STATIC_DIRECTORY = 'http://localhost:3334'

export const DEFAULT_TRAININGS_COUNT_LIMIT = 5;
export const DEFAULT_ORDERS_COUNT_LIMIT = 1;
export const DEFAULT_FRIENDS_COUNT_LIMIT = 1;


interface GENDERS_DICTIONARY  {
  [index: string]: string
};

export const GENDERS_DICTIONARY: GENDERS_DICTIONARY = {
  'для мужчин': 'Мужчинам',
  'для женщин': 'Женщинам',
  'для всех':'Всем',
}
