import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import { User } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLoginError = (state: State): boolean => state[NameSpace.User].loginError;
export const userSelector = (state: State): {data: User | null; isLoading: boolean; isError: boolean} => state[NameSpace.User].user;
