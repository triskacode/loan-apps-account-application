import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';

export class MicroserviceHelper {
  static async sendRequest<TResult = any, TInput = any>(
    to: ClientProxy,
    endpoint: any,
    data: TInput,
  ): Promise<TResult> {
    const result = to.send<{ data: TResult }, TInput>(endpoint, data).pipe(
      catchError((err) =>
        throwError(() => {
          switch (err.code) {
            case 400:
              return new BadRequestException(err.errors ?? err.message);
            case 401:
              return new UnauthorizedException(err.errors ?? err.message);
            case 404:
              return new NotFoundException(err.errors ?? err.message);
            default:
              return new InternalServerErrorException(
                err.errors ?? err.message,
              );
          }
        }),
      ),
    );

    return (await firstValueFrom(result)).data;
  }
}
