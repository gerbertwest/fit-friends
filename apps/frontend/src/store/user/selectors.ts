import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import { User } from '../../types/user';
import { UserRequest } from '../../types/request';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLoginError = (state: State): boolean => state[NameSpace.User].loginError;
export const userSelector = (state: State): {data: User | null; isLoading: boolean; isError: boolean} => state[NameSpace.User].user;
export const updateUserSelector = (state: State): {data: User | null} => state[NameSpace.User].updateUserData;
export const userFriendsSelector = (state: State): {data: User[]; isLoading: boolean} => state[NameSpace.User].users;
export const userRequests = (state: State): {data: UserRequest[]} => state[NameSpace.User].requests;
