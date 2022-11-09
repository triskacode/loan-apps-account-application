import {
  Catch,
  RpcExceptionFilter,
  HttpException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch()
export class MicroservcieExceptionFilter implements RpcExceptionFilter {
  catch(exception: Error): Observable<any> {
    let errors: string;
    let message: string;

    switch (exception.constructor) {
      case BadRequestException:
        const customErrors =
          (exception as any).getResponse().message.reduce?.((prev, error) => {
            const errorMessage = Object.values(error.constraints)[0];

            prev[error.property] = errorMessage;
            return prev;
          }, {}) ??
          (exception.message !== 'Bad Request' ? exception.message : null);

        message = 'Bad Request';
        errors = customErrors;
        break;
      case NotFoundException:
        message = 'Not Found';
        errors = exception.message !== 'Not Found' ? exception.message : null;
        break;
      case UnauthorizedException:
        message = 'Unauthorized';
        errors =
          exception.message !== 'Unauthorized' ? exception.message : null;
        break;
      default:
        message = 'Internal Server Error';
        errors =
          exception instanceof HttpException
            ? exception.message !== 'Internal Server Error'
              ? exception.message
              : null
            : 'Whoops, something went wrong';
    }

    return throwError(() => ({
      code:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      errors,
      data: null,
    }));
  }
}
