import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MicroservcieExceptionFilter } from 'src/common/filters/microservice-exception.filter';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { AccountService } from './account.service';
import { UpdateBalanceType } from './account.types';
import { HandleLoanApprovedDto } from './dto/handle-loan-approved.dto';
import { HandleUserActivatedDto } from './dto/handle-user-activated.dto';
import { HandleUserDeletedDto } from './dto/handle-user-deleted.dto';
import { HandleUserUpdatedDto } from './dto/handle-user-updated.dto';

@Controller()
@UseFilters(MicroservcieExceptionFilter)
@UseInterceptors(TransformResponseInterceptor)
export class AccountMicroserviceController {
  constructor(private accountService: AccountService) {}

  @EventPattern('user-activated')
  handleUserActivated(dto: HandleUserActivatedDto) {
    console.log('user-activated');
    this.accountService.create(dto).then(console.log);
  }

  @EventPattern('user-updated')
  handleUserUpdated(dto: HandleUserUpdatedDto) {
    console.log('user-updated');
    this.accountService.update(dto.id, dto).then(console.log);
  }

  @EventPattern('user-deleted')
  handleUserDeleted(dto: HandleUserDeletedDto) {
    console.log('user-deleted');
    this.accountService.delete(dto.id).then(console.log);
  }

  @EventPattern('loan-approved')
  handleLoanApproved(dto: HandleLoanApprovedDto) {
    console.log('loan-approved');
    this.accountService
      .updateBalance(dto.user_id, {
        amount: dto.amount,
        type: UpdateBalanceType.INCREMENT,
      })
      .then(console.log);
  }
}
