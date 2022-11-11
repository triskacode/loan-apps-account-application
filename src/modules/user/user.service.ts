import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceHelper } from 'src/common/helpers/microservice.helper';
import { User } from 'src/domain/user';
import { FilterFindAllUserDto } from './dto/filter-find-all-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_APPLICATION') private client: ClientProxy) {}

  async findAllUser(filter?: FilterFindAllUserDto): Promise<User[]> {
    return MicroserviceHelper.sendRequest<User[], FilterFindAllUserDto>(
      this.client,
      { endpoint: 'user', cmd: 'find-all' },
      filter,
    );
  }
}
