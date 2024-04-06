import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { AxiosErrorInfo } from '@fit-friends/shared/app-types';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const data: AxiosErrorInfo = error.response.data
    const message = data.message || INTERNAL_SERVER_ERROR_MESSAGE
    const status = data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorTitle = data.error || INTERNAL_SERVER_ERROR_MESSAGE

    console.log(message)

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        error: errorTitle
      });
  }
}
