import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MicroservcieExceptionFilter } from 'src/common/filters/microservice-exception.filter';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller()
@UseFilters(MicroservcieExceptionFilter)
@UseInterceptors(TransformResponseInterceptor)
export class AccountMicroserviceController {
  constructor(private accountService: AccountService) {}

  @EventPattern('user-activated')
  handleUserActivated(dto: CreateAccountDto) {
    this.accountService.create(dto);
  }

  @EventPattern('user-deleted')
  handleUserDeleted(dto: DeleteAccountDto) {
    this.accountService.delete(dto);
  }
}
