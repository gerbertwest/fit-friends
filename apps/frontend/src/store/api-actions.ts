import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, BACKEND_URL, HTTP_CODE, REDIRECT_ACTION_NAME, REQUEST_TIMEOUT, UserRole} from '../const';
import { dropToken, getRefreshToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Token } from '../types/token';
import { TokenPayload } from '../types/token-payload';
import { NewUser } from '../types/new-user';
import { UpdateUser } from '../types/update-user';
import { User } from '../types/user';
import { Training } from '../types/training';
import { Request } from '../types/request';
import { TrainerOrder } from '../types/trainer-order';
import { NewTraining } from '../types/new-training';
import { EditTraining } from '../types/edit-training';
import { NewReview } from '../types/new-review';
import { NewOrder } from '../types/new-order';
import { Order } from '../types/order';
import { EditOrder } from '../types/edit-order';
import { Alert } from '../types/alert';

export const redirectToRoute = createAction<string>(REDIRECT_ACTION_NAME);

export const checkAuthAction = createAsyncThunk<TokenPayload, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const check = await api.get<TokenPayload>(APIRoute.Check);
    return check.data
  },
);

export const refreshAuthAction = createAsyncThunk<TokenPayload, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/refreshAuth',
  async (_arg, {extra: api}) => {

   const token = getRefreshToken();
   const api2 = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
   const {data} = await api2.post(APIRoute.Refrech, null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
   })
   saveToken(data.accessToken, data.refreshToken)
   api.get<TokenPayload>(APIRoute.Check);
   return data
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
      dispatch(redirectToRoute(`${AppRoute.QuestionaireCoach}/${postData.data.id}`))
    }
    else if (postData.status === HTTP_CODE.CREATED && role === UserRole.User) {
      dispatch(redirectToRoute(`${AppRoute.QuestionaireUser}/${postData.data.id}`))
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
    certificate, merits, personalTrainings, avatarFile, certificates, sex, name, location, avatar}, { dispatch, extra: api }) => {
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
      certificates,
      sex,
      name,
      location,
      avatar
    });

    if (postData.status === HTTP_CODE.OK && certificate) {
      const payload = new FormData();
      payload.append('file', certificate);
      const {data} = await api.post(APIRoute.Certificates, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data
    }

    if (postData.status === HTTP_CODE.OK && avatarFile) {
      const payload = new FormData();
      payload.append('file', avatarFile);
      await api.post(APIRoute.Avatar, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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

export const fetchMyTrainingsByIdAction = createAsyncThunk<Training[], {
  queryString?: string;
  id: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchMyTrainingsById',
  async ({queryString, id}, {extra: api}) => {
      const {data} = await api.get<Training[]>(`${APIRoute.MyTrainings}/${id}${queryString}`);
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

export const fetchUserFriends = createAsyncThunk<User[], {queryString?: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchUserFriends',
  async ({queryString}, {extra: api}) => {
    const {data} = await api.post<User[]>(`${APIRoute.UserFriends}${queryString}`);
    return data;
  },
);

export const fetchRequestsByUser = createAsyncThunk<Request[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchRequestsByUser',
  async (_arg, {extra: api}) => {
    const {data} = await api.post<Request[]>(`${APIRoute.Requests}`);
    return data;
  },
);

export const fetchRequestsByInitiator = createAsyncThunk<Request[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchRequestsByInitiator',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Request[]>(`${APIRoute.Requests}/initiator`);
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

export const fetchUserOrdersAction = createAsyncThunk<TrainerOrder[], {
  queryString?: string
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchUserOrders',
  async ({queryString}, {extra: api}) => {
      const {data} = await api.get<TrainerOrder[]>(`${APIRoute.UserOrders}${queryString}`);
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

    if (postData.status === HTTP_CODE.CREATED) {
      await api.post(APIRoute.Email);
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

export const fetchTrainingByIdAction = createAsyncThunk<Training, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/fetchTrainingById',
  async (trainingId, {extra: api}) => {
    const {data} = await api.get<Training>(`${APIRoute.Trainings}/${trainingId}`);
    return data;
  },
);

export const updateTraining = createAsyncThunk<Training, EditTraining, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/update',
  async ({description, price, title, id, videoFile, video}, { dispatch, extra: api }) => {
    const postData = await api.patch(`${APIRoute.Trainings}/${id}`, {
      description,
      price,
      title,
      video
    });

    if (postData.status === HTTP_CODE.OK && videoFile) {
      const payload = new FormData();
      payload.append('file', videoFile);
      await api.post(`${APIRoute.Video}/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    return postData.data;
  }
);

export const createReview = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/createReview',
  async ({ message, trainingId, raiting }, { dispatch, extra: api }) => {
    await api.post<{ id: number }>(APIRoute.Review, {
      message, trainingId, raiting
    });
  }
);

export const createOrder = createAsyncThunk<void, NewOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'order/createOrder',
  async ({ count, paymentMethod, type, trainingId, userId }, { dispatch, extra: api }) => {
     await api.post<{ id: number }>(APIRoute.Order, {
      count,
      paymentMethod,
      type,
      trainingId,
      userId
    });
  }
);

export const fetchOrderAction = createAsyncThunk<Order | null, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'order/fetchOrder',
  async (trainingId, {extra: api}) => {
    const {data} = await api.get<Order | null>(`${APIRoute.Order}?trainingId=${trainingId}`);
    return data;
  },
);

export const updateOrder = createAsyncThunk<Order, EditOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'training/update',
  async ({count, active, id}, { dispatch, extra: api }) => {
    const postData = await api.patch(`${APIRoute.Order}/${id}`, {
      count,
      active
    });

    return postData.data;
  }
);

export const fetchAddFriendAction = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addFriend',
  async (friendId, {extra: api}) => {
    const {data} = await api.patch<User>(`${APIRoute.Users}/${friendId}`);
    return data;
  },
);

export const fetchDeleteFriendAction = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteFriend',
  async (friendId, {extra: api}) => {
    const {data} = await api.delete<User>(`${APIRoute.Users}/${friendId}`);
    return data;
  },
);

export const fetchExistFriend = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/existFriend',
  async (friendId, {extra: api}) => {
    const {data} = await api.get<User>(`${APIRoute.Users}/friend/exist/${friendId}`);
    return data;
  },
);

export const fetchNewRequestAction = createAsyncThunk<Request, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/createRequest',
  async (userId, {extra: api}) => {
    const request = await api.post<Request>(`${APIRoute.Requests}/${userId}`);
    return request.data
  },
);

export const fetchExistRequest = createAsyncThunk<Request, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/existRequest',
  async (userId, {extra: api}) => {
    const {data} = await api.get<Request>(`${APIRoute.Requests}/exist/${userId}`);
    return data;
  },
);

export const fetchUpdateRequest = createAsyncThunk<Request, Request, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/updateRequest',
  async ({status, initiatorId}, { dispatch, extra: api }) => {
    const updateRequest = await api.patch(`${APIRoute.Requests}/${initiatorId}`, {
      status,
    });

    return updateRequest.data;
  }
);

export const fetchRequest = createAsyncThunk<Request, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/request',
  async (initiatorId, {extra: api}) => {
    const {data} = await api.post<Request>(`${APIRoute.Requests}/show/${initiatorId}`);
    return data;
  },
);

export const fetchAddSubscriptionAction = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addSubscription',
  async (trainerId, {extra: api}) => {
    const {data} = await api.patch<User>(`${APIRoute.Subscriptions}/${trainerId}`);
    return data;
  },
);

export const fetchDeleteSubscriptionAction = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteSubscription',
  async (trainerId, {extra: api}) => {
    const {data} = await api.delete<User>(`${APIRoute.Subscriptions}/${trainerId}`);
    return data;
  },
);

export const fetchSubscriptions = createAsyncThunk<User[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchSubscriptions',
  async (_arg, {extra: api}) => {
    const {data} = await api.post<User[]>(`${APIRoute.Subscriptions}/`);
    return data;
  },
);

export const fetchAlertsAction = createAsyncThunk<Alert[], undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchAlerts',
  async (_arg, {extra: api}) => {
      const {data} = await api.post<Alert[]>(`${APIRoute.Alerts}`);
      return data;
  },
);

export const fetchDeleteAlertAction = createAsyncThunk<Alert, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteAlerts',
  async (alertId, {extra: api}) => {
    const {data} = await api.delete<Alert>(`${APIRoute.Alerts}/${alertId}`);
    return data;
  },

);

export const fetchDeleteFile = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'upload/deleteFile',
  async (path, {extra: api}) => {
    const {data} = await api.delete<string>(`${APIRoute.Upload}/deleteFile?path=${path}`);
    return data;
  },

);
