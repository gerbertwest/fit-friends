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
  TrainingCatalog = '/catalog',
  Training = '/training',
  TrainingId = ':id',
  UserCatalog = '/userCatalog',
  User = '/user',
  Trainer = '/trainer',
  UserAccount = '/userAccount',
  MyPurchases = '/myPurchases',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Training = 'TRAINING',
  User = 'USER',
  Order = "ORDER",
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
  UserFriends = '/users/friends',
  Requests = 'users/request',
  TrainerOrders = 'order/trainer',
  UserOrders = 'order/user',
  CreateTraining = '/training',
  Video = '/training/video',
  Trainings = '/training',
  Review = '/review',
  Order = '/order',
  Subscriptions = '/users/subscriptions',
  Alerts = '/users/alerts',

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
export const DEFAULT_USERS_COUNT_LIMIT = 12;


interface GENDERS_DICTIONARY  {
  [index: string]: string
};

export const GENDERS_DICTIONARY: GENDERS_DICTIONARY = {
  'для мужчин': 'Мужчинам',
  'для женщин': 'Женщинам',
  'для всех':'Всем',
};

interface LOCATION_DICTIONARY  {
  [index: string]: [number, number]
};

export const LOCATION_DICTIONARY: LOCATION_DICTIONARY = {
  Пионерская: [60.00248374331881, 30.296434497006683],
  Петроградская: [59.9663156693946, 30.31126450427052],
  Удельная: [60.016671679301034, 30.315353791084995],
  Звёздная: [59.83336683172382, 30.34933468807454],
  Спортивная: [59.95188384342514, 30.29070468988651],
}
