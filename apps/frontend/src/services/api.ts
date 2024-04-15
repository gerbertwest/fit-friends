import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import {getToken} from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.UNAUTHORIZED]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{message: string}>) => {

      if (error.response && shouldDisplayError(error.response)) {
        const message = error.response.data.message
        toast.warn(message, {
          toastId: message
        });
      }
      throw error;
    }
  );

  return api;
};
