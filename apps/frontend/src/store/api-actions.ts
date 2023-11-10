import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, REDIRECT_ACTION_NAME, UserRole} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Token } from '../types/token';
import { TokenPayload } from '../types/token-payload';

const redirectToRoute = createAction<string>(REDIRECT_ACTION_NAME);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<Token>(APIRoute.Login, {email, password});
    const {accessToken, refreshToken} = data
    saveToken(accessToken, refreshToken);
    const {data: {role}} = (await api.get<TokenPayload>(APIRoute.Check))

    console.log(role)

    if (role === UserRole.Admin) {
      dispatch(redirectToRoute(AppRoute.CoachAccount));
    }
    else {dispatch(redirectToRoute(AppRoute.Main));}
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra }) => {
    dropToken();
  },
);
