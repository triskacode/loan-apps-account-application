import {
  Controller,
  Logger,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
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
  async handleUserActivated(dto: HandleUserActivatedDto) {
    try {
      Logger.debug('handle user-activated', 'AccountMicroserviceController');
      await this.accountService.create(dto).then(console.log);
    } catch (err) {
      Logger.error(err.message, 'AccountMicroserviceController');
    }
  }

  @EventPattern('user-updated')
  async handleUserUpdated(dto: HandleUserUpdatedDto) {
    try {
      Logger.debug('handle user-updated', 'AccountMicroserviceController');
      await this.accountService.update(dto.id, dto).then(console.log);
    } catch (err) {
      Logger.error(err.message, 'AccountMicroserviceController');
    }
  }

  @EventPattern('user-deleted')
  async handleUserDeleted(dto: HandleUserDeletedDto) {
    try {
      Logger.debug('handle user-deleted', 'AccountMicroserviceController');
      await this.accountService.delete(dto.id).then(console.log);
    } catch (err) {
      Logger.error(err.message, 'AccountMicroserviceController');
    }
  }

  @EventPattern('loan-approved')
  async handleLoanApproved(dto: HandleLoanApprovedDto) {
    try {
      Logger.debug('handle loan-approved', 'AccountMicroserviceController');
      await this.accountService
        .updateBalance(dto.user_id, {
          amount: dto.amount,
          type: UpdateBalanceType.INCREMENT,
        })
        .then(console.log);
    } catch (err) {
      Logger.error(err.message, 'AccountMicroserviceController');
    }
  }
}
