import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountMicroserviceController } from './account.microservice.controller';
import { StripeModule } from '../stripe/stripe.module';
import { AccountRepository } from './account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), StripeModule],
  controllers: [AccountMicroserviceController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
