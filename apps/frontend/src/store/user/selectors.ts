import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import { User } from '../../types/user';
import { Request } from '../../types/request';
import { TokenPayload } from '../../types/token-payload';
import { Alert } from '../../types/alert';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLoginError = (state: State): boolean => state[NameSpace.User].loginError;
export const userSelector = (state: State): {data: User | null; isLoading: boolean; isError: boolean} => state[NameSpace.User].user;
export const updateUserSelector = (state: State): {data: User | null} => state[NameSpace.User].updateUserData;
export const userFriendsSelector = (state: State): {data: User[]; isLoading: boolean} => state[NameSpace.User].users;
export const userRequests = (state: State): {data: Request[]} => state[NameSpace.User].requests;
export const usersSelector = (state: State): {data: User[]; isLoading: boolean; isError: boolean} => state[NameSpace.User].users;
export const tokenPayloadSelector = (state: State): {data: TokenPayload | null} => state[NameSpace.User].tokenPayload;
export const userRequest = (state: State): {data: Request | null, isError: boolean} => state[NameSpace.User].request;
export const alerts = (state: State): {data: Alert[]; isError: boolean} => state[NameSpace.User].alerts;
export const existFriend = (state: State): {isError: boolean} => state[NameSpace.User].friend;
