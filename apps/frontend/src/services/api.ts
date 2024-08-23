import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import {getToken} from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.CONFLICT]: true,
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
    (error: AxiosError<{message: string | Array<string>}>) => {

      if (error.response && shouldDisplayError(error.response)) {
        const message: string | Array<string> = error.response.data.message

        if (message instanceof Array) {
          message.map((mes: string) => toast.warn(mes, {
            toastId: mes
          }))
        }

        else {
          toast.warn(message, {toastId: message});
        }

      }
      throw error;
    }
  );

  return api;
};
