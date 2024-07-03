import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';
import {checkAuthAction, fetchAlertsAction, fetchExistFriend, fetchExistRequest, fetchMyFriends, fetchRequest, fetchRequestsByInitiator, fetchRequestsByUser,
  fetchSubscriptions, fetchUpdateRequest, fetchUserByIdAction, fetchUserFriends, fetchUsers,
  loginAction, logoutAction, registerUser, updateUser} from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginError: false,
  user: {
    data: null,
    isError: false,
    isLoading: false,
  },
  updateUserData: {
    data: null
  },
  users: {
    data: [],
    isError: false,
    isLoading: false,
  },
  requests: {
    data: []
  },
  requestsByInitiator: {
    data: []
  },
  request: {
    data: null,
    isError: false,
  },
  tokenPayload: {
    data: null
  },
  alerts: {
    data: [],
    isError: false,
  },
  friend: {
    isError: false,
  }
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setLoginError: (state, action: PayloadAction<{isError: boolean}>) => {
      const {isError} = action.payload;
      state.loginError = isError;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.tokenPayload.data = action.payload
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loginError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(registerUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(fetchUserByIdAction.pending, (state) => {
        state.user.isLoading = true;
      })
      .addCase(fetchUserByIdAction.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.isLoading = false;
      })
      .addCase(fetchUserByIdAction.rejected, (state) => {
        state.user.isError = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserData.data = action.payload
      })
      .addCase(fetchMyFriends.pending, (state) => {
        state.users.isLoading = true;
      })
      .addCase(fetchMyFriends.fulfilled, (state, action) => {
        state.users.data = action.payload;
        state.users.isLoading = false;
      })
      .addCase(fetchUserFriends.pending, (state) => {
        state.users.isLoading = true;
      })
      .addCase(fetchUserFriends.fulfilled, (state, action) => {
        state.users.data = action.payload;
        state.users.isLoading = false;
      })
      .addCase(fetchExistFriend.rejected, (state, action) => {
        state.friend.isError = true;
      })
      .addCase(fetchExistFriend.fulfilled, (state, action) => {
        state.friend.isError = false;
      })
      .addCase(fetchRequestsByUser.fulfilled, (state, action) => {
        state.requests.data = action.payload;
      })
      .addCase(fetchRequestsByInitiator.fulfilled, (state, action) => {
        state.requestsByInitiator.data = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.users.isError = true;
      })
      .addCase(fetchExistRequest.fulfilled, (state, action) => {
        state.request.data = action.payload;
      })
      .addCase(fetchUpdateRequest.fulfilled, (state, action) => {
        state.request.data = action.payload;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.request.data = action.payload;
      })
      .addCase(fetchExistRequest.rejected, (state, action) => {
        state.request.isError = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.users.data = action.payload;
      })
      .addCase(fetchAlertsAction.fulfilled, (state, action) => {
        state.alerts.data = action.payload;
      })
  }
});

export const {setLoginError} = userProcess.actions;
