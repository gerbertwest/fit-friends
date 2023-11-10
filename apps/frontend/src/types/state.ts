import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  loginError: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
