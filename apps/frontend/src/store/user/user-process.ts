import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';
import {checkAuthAction, fetchUserByIdAction, loginAction, logoutAction, registerUser, updateUser} from '../api-actions';

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
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
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
      .addCase(logoutAction.fulfilled, (state, action) => {
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
        console.log(action.payload)
        state.updateUserData.data = action.payload
      })
  }
});

export const {setLoginError} = userProcess.actions;
