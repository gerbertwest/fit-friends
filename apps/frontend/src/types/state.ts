import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';
import { UserRequest } from './request';
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
    data: UserRequest[]
  }
};

export type TrainingProcess = {
  myTrainings: {
    data: Training[];
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
  };
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
