import {AxiosInstance} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State } from '../../types/state.ts';
import { saveToken, dropToken } from '../../services/token.ts';
import {APIRoute, AppRoute} from '../../const.ts';
import { AuthData } from '../../types/requests/auth-data.ts';
import { AppDispatch } from '../../types/state.ts';
import { UserDto } from '../../types/responses/user-dto.ts';
import {redirectToRoute} from '../redirect-action.ts';

export const checkAuthAction = createAsyncThunk<UserDto, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<UserDto>(APIRoute.Login);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginAction = createAsyncThunk<UserDto, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password } : AuthData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserDto>(APIRoute.Login, { email, password });
      saveToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
    } finally {
      dropToken();
    }

    dispatch(redirectToRoute(AppRoute.Login));
  },
);
