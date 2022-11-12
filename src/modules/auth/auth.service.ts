import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceHelper } from 'src/common/helpers/microservice.helper';
import { User } from 'src/domain/user';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_APPLICATION') private client: ClientProxy,
    configService: ConfigService,
  ) {
    if (!configService.get('microservice.auth.host'))
      throw new Error('Missing env var AUTH_SERVICE_HOST');
    if (!configService.get('microservice.auth.port'))
      throw new Error('Missing env var AUTH_SERVICE_PORT');
  }

  validateToken(token: string): Promise<User> {
    return MicroserviceHelper.sendRequest<User, ValidateTokenDto>(
      this.client,
      { endpoint: 'auth', cmd: 'validate-token' },
      { token },
    );
  }
}
