import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceHelper } from 'src/common/helpers/microservice.helper';
import { User } from 'src/domain/user';
import { FilterFindAllUserDto } from './dto/filter-find-all-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_APPLICATION') private client: ClientProxy,
    configService: ConfigService,
  ) {
    if (!configService.get('microservice.user.host'))
      throw new Error('Missing env var USER_SERVICE_HOST');
    if (!configService.get('microservice.user.port'))
      throw new Error('Missing env var USER_SERVICE_PORT');
  }

  async findAllUser(filter?: FilterFindAllUserDto): Promise<User[]> {
    return MicroserviceHelper.sendRequest<User[], FilterFindAllUserDto>(
      this.client,
      { endpoint: 'user', cmd: 'find-all' },
      filter,
    );
  }
}
