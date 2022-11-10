import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceHelper } from 'src/common/helpers/microservice.helper';
import { User } from 'src/domain/user';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_APPLICATION') private client: ClientProxy) {}

  validateToken(token: string): Promise<User> {
    return MicroserviceHelper.sendRequest<User, ValidateTokenDto>(
      this.client,
      { endpoint: 'auth', cmd: 'validate-token' },
      { token },
    );
  }
}
