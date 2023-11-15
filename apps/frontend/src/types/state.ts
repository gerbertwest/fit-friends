import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';
import { User } from './user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  loginError: boolean;
  user: {
    data: User | null;
    isLoading: boolean;
    isError: boolean;
  };
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;