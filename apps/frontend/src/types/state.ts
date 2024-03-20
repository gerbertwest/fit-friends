import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';
import { Alert } from './alert';
import { Order } from './order';
import { Request } from './request';
import { TokenPayload } from './token-payload';
import { TrainerOrder } from './trainer-order';
import { Training } from './training';
import { User } from './user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  loginError: boolean;
  user: {
    data: User | null;
    isLoading: boolean;
    isError: boolean;
  };
  updateUserData: {
    data: User | null
  };
  users: {
    data: User[];
    isLoading: boolean;
    isError: boolean;
  };
  requests: {
    data: Request[]
  };
  request: {
    isError: boolean;
    data: Request | null
  }
  tokenPayload: {
    data: TokenPayload | null;
  }
  alerts: {
    data: Alert[];
    isError: boolean;
  }
  friend: {
    isError: boolean;
  }
};

export type TrainingProcess = {
  myTrainings: {
    data: Training[];
    isLoading: boolean;
    isError: boolean;
  };
  training: {
    data: Training | null;
    isLoading: boolean;
    isError: boolean;
  };
  specTrainings: {
    data: Training[];
    isLoading: boolean;
    isError: boolean;
  };
  raitingTrainings: {
    data: Training[];
    isLoading: boolean;
    isError: boolean;
  };
  trainerOrders: {
    data: TrainerOrder[];
    isError: boolean;
    isLoading: boolean;
  };
  userOrders: {
    data: TrainerOrder[];
    isError: boolean;
  };
};

export type OrderProcess = {
  createStatus: boolean;
  order: {
    data: Order | null;
    isLoading: boolean;
    isError: boolean;
  };
  orders: {
    data: Order[];
    isLoading: boolean;
    isError: boolean;
  };
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
