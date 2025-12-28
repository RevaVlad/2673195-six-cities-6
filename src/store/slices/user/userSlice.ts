import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../../const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../../apiActions/userActions.ts';
import {UserState} from '../../../types/stateSlices/userState.ts';
import {UserDto} from '../../../types/responses/userDto.ts';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    },
    clearUserData: (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NotAuth;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
        state.user = null;
      });
  }
});

export const { setUserData, clearUserData } = userData.actions;
