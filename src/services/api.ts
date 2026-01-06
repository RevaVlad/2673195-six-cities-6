import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const.ts';
import {getToken} from './token.ts';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {DetailMessageType} from '../types/detailMessageType.ts';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.UNAUTHORIZED]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  Boolean(StatusCodeMapping[response.status]);

const getMessageByError = (statusCode: StatusCodes, errorMessage: DetailMessageType) => {
  switch (statusCode) {
    case StatusCodes.UNAUTHORIZED:
      return 'You need to be signed in, for this action.';
    default:
      throw new Error(`Unexpected error type. Status code: "${statusCode}", errorMessage: "${errorMessage.message}"`);
  }
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = getMessageByError(error.response.status, error.response.data);

        toast.warn(detailMessage);
      }

      throw error;
    }
  );

  return api;
};
