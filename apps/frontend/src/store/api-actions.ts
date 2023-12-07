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
import { Training } from '../types/training';
import { UserRequest } from '../types/request';
import { TrainerOrder } from '../types/trainer-order';
import { NewTraining } from '../types/new-training';

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
  'user/fetchUserById',
  async (userId, {extra: api}) => {
    const {data} = await api.get<User>(`${APIRoute.Users}/${userId}`);
    return data;
  },
);

export const fetchMyTrainingsAction = createAsyncThunk<Training[], {
  queryString?: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchMyTrainings',
  async ({queryString}, {extra: api}) => {
      const {data} = await api.get<Training[]>(`${APIRoute.MyTrainings}${queryString}`);
      return data;
  },
);

export const fetchMyFriends = createAsyncThunk<User[], {queryString?: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchMyFriends',
  async ({queryString}, {extra: api}) => {
    const {data} = await api.post<User[]>(`${APIRoute.MyFriends}${queryString}`);
    return data;
  },
);

export const fetchRequestsByUser = createAsyncThunk<UserRequest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchRequestsByUser',
  async (_arg, {extra: api}) => {
    const {data} = await api.post<UserRequest[]>(`${APIRoute.Requests}`);
    return data;
  },
);

export const fetchTrainerOrdersAction = createAsyncThunk<TrainerOrder[], {
  queryString?: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchTrainerOrders',
  async ({queryString}, {extra: api}) => {
      const {data} = await api.get<TrainerOrder[]>(`${APIRoute.TrainerOrders}${queryString}`);
      return data;
  },
);

export const createTraining = createAsyncThunk<void, NewTraining, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/createTraining',
  async ({ title, level, description, trainingTime, trainingType, sex, price, caloriesCount, video, special }, { dispatch, extra: api }) => {
    const postData = await api.post<{ id: number }>(APIRoute.CreateTraining, {
      title,
      level,
      trainingTime,
      trainingType,
      sex,
      description,
      price,
      caloriesCount,
      special,
    });

    if (postData.status === HTTP_CODE.CREATED && video) {
      const payload = new FormData();
      payload.append('file', video);
      await api.post(`${APIRoute.Video}/${postData.data.id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  }
);

export const fetchTrainingsAction = createAsyncThunk<Training[], {
  queryString?: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchTrainings',
  async ({queryString}, {extra: api}) => {
      const {data} = await api.get<Training[]>(`${APIRoute.Trainings}${queryString}`);
      return data;
  },
);

export const fetchSpecTrainingsAction = createAsyncThunk<Training[], {
  queryString?: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchSpecTrainings',
  async ({queryString}, {extra: api}) => {
      const {data} = await api.get<Training[]>(`${APIRoute.Trainings}${queryString}`);
      return data;
  },
);

export const fetchRaitingTrainingsAction = createAsyncThunk<Training[], {
  queryString?: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchRaitingTrainings',
  async ({queryString}, {extra: api}) => {
      const {data} = await api.get<Training[]>(`${APIRoute.Trainings}${queryString}`);
      return data;
  },
);

export const fetchUsers = createAsyncThunk<User[], {queryString?: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchUsers',
  async ({queryString}, {extra: api}) => {
    const {data} = await api.get<User[]>(`${APIRoute.Users}${queryString}`);
    return data;
  },
);
