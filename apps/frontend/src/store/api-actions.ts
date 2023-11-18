import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, HTTP_CODE, REDIRECT_ACTION_NAME, UserRole} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Token } from '../types/token';
import { TokenPayload } from '../types/token-payload';
import { NewUser } from '../types/new-user';
import { UpdateUser } from '../types/update-user';
import { User } from '../types/user';

export const redirectToRoute = createAction<string>(REDIRECT_ACTION_NAME);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Check);
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
    const {data: {role, sub}} = (await api.get<TokenPayload>(APIRoute.Check))

    if (role === UserRole.Admin) {
      dispatch(redirectToRoute(`${AppRoute.CoachAccount}/${sub}`));
    }
    else {dispatch(redirectToRoute(`${AppRoute.Main}/${sub}`));}
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

export const registerUser = createAsyncThunk<void, NewUser, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async ({ email, dateBirth, role, sex, description, location, password, name, avatar }, { dispatch, extra: api }) => {
    const postData = await api.post<{ id: string }>(APIRoute.Registry, {
      email,
      password,
      name,
      dateBirth,
      role,
      sex,
      description,
      location
    });

    if (postData.status === HTTP_CODE.CREATED) {
      const {data} = await api.post<Token>(APIRoute.Login, {email, password});
      const {accessToken, refreshToken} = data
      saveToken(accessToken, refreshToken);
    }

    if (postData.status === HTTP_CODE.CREATED && avatar) {
      const payload = new FormData();
      payload.append('file', avatar);
      await api.post(APIRoute.Avatar, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    if (postData.status === HTTP_CODE.CREATED && role === UserRole.Admin) {
      dispatch(redirectToRoute(AppRoute.QuestionaireCoach))
    }
    else if (postData.status === HTTP_CODE.CREATED && role === UserRole.User) {
      dispatch(redirectToRoute(AppRoute.QuestionaireUser))
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUser, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/update',
  async ({description, level, trainingTime, trainingType,
    caloriesToLose, caloriesToBurn, readyToTraining,
    certificate, merits, personalTrainings, avatar, certificates}, { dispatch, extra: api }) => {
    const postData = await api.patch(APIRoute.UpdateUser, {
      description,
      level,
      trainingTime,
      trainingType,
      caloriesToBurn,
      caloriesToLose,
      readyToTraining,
      merits,
      personalTrainings,
      certificates
    });

    if (postData.status === HTTP_CODE.OK && certificate) {
      const payload = new FormData();
      payload.append('file', certificate);
      const {data} = await api.post(APIRoute.Certificates, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data
    }

    if (postData.status === HTTP_CODE.OK && avatar) {
      const payload = new FormData();
      payload.append('file', avatar);
      await api.post(APIRoute.Avatar, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }


    if (postData.status === HTTP_CODE.OK && postData.data.role === UserRole.Admin) {
      dispatch(redirectToRoute(`${AppRoute.CoachAccount}/${postData.data.id}`))
    }
    else if (postData.status === HTTP_CODE.OK && postData.data.role === UserRole.User) {
      dispatch(redirectToRoute(`${AppRoute.Main}/${postData.data.id}`))
    }
    return postData.data;
  }
);

export const fetchUserByIdAction = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchUserById',
  async (userId, {extra: api}) => {
    const {data} = await api.get<User>(`${APIRoute.Users}/${userId}`);
    return data;
  },
);

export const deleteCertificate = createAsyncThunk<void, UpdateUser, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/update',
  async ({certificate}, {dispatch, extra: api }) => {
    const data = await api.post(APIRoute.DeleteCertificate, {
      certificate
    });
  dispatch(redirectToRoute(`${AppRoute.CoachAccount}/${data.data.id}`))
  }

);
