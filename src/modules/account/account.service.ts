import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { AccountRepository } from './account.repository';
import { UpdateBalanceType } from './account.types';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreatePaymentIntens } from './dto/create-payment-intens.dto';
import { UpdateAccountBalanceDto } from './dto/update-account-balance.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    private stripeService: StripeService,
    private accountRepository: AccountRepository,
  ) {}

  async create(dto: CreateAccountDto) {
    const account = await this.accountRepository.findById(dto.id);
    if (account) return account;

    const customer = await this.stripeService.createCustumer(dto.email);

    const entity = new Account();

    entity.id = dto.id;
    entity.customer_id = customer.id;
    entity.email = dto.email;

    return this.accountRepository.create(entity);
  }

  async update(id: number, dto: UpdateAccountDto) {
    const entity = await this.accountRepository.findById(id);

    if (!entity)
      throw new NotFoundException(`Account with id: ${id} not found`);

    return this.accountRepository.update(entity, dto);
  }

  async updateBalance(id: number, dto: UpdateAccountBalanceDto) {
    const entity = await this.accountRepository.findById(id);

    if (!entity)
      throw new NotFoundException(`Account with id: ${id} not found`);

    let newLoanBalance: number;

    switch (dto.type) {
      case UpdateBalanceType.DECREMENT:
        newLoanBalance = entity.loan_balance - dto.amount;
        break;
      case UpdateBalanceType.INCREMENT:
        newLoanBalance = entity.loan_balance + dto.amount;
        break;
    }

    return this.accountRepository.update(entity, {
      loan_balance: newLoanBalance,
    });
  }

  async updateBalanceByCustomerId(
    customerId: string,
    dto: UpdateAccountBalanceDto,
  ) {
    const entity = await this.accountRepository.findByCustomerId(customerId);

    if (!entity)
      throw new NotFoundException(
        `Account with customer_id: ${customerId} not found`,
      );

    let newLoanBalance: number;

    switch (dto.type) {
      case UpdateBalanceType.DECREMENT:
        newLoanBalance = entity.loan_balance - dto.amount;
        break;
      case UpdateBalanceType.INCREMENT:
        newLoanBalance = entity.loan_balance + dto.amount;
        break;
    }

    return this.accountRepository.update(entity, {
      loan_balance: newLoanBalance,
    });
  }

  async delete(id: number) {
    const entity = await this.accountRepository.findById(id);

    if (!entity)
      throw new NotFoundException(`Account with id: ${id} not found`);

    await this.stripeService.deleteCustumer(entity.customer_id);

    return this.accountRepository.delete(entity);
  }

  async createPaymentIntens(id: number, dto: CreatePaymentIntens) {
    const account = await this.accountRepository.findById(id);

    if (!account)
      throw new NotFoundException(`Account with id: ${id} not found`);

    if (dto.amount > account.loan_balance)
      throw new BadRequestException(
        `Amount too large, maximum amoint is ${account.loan_balance}`,
      );

    const { client_secret } = await this.stripeService.createPaymentIntens(
      account.customer_id,
      dto.amount,
    );

    return { client_secret };
  }

  async findById(id: number): Promise<Account> {
    const entity = await this.accountRepository.findById(id);

    if (!entity)
      throw new NotFoundException(`Account with id: ${id} not found`);

    return entity;
  }

  async findByCustomerId(customerId: string): Promise<Account> {
    const entity = await this.accountRepository.findByCustomerId(customerId);

    if (!entity)
      throw new NotFoundException(
        `Account with customer_id: ${customerId} not found`,
      );

    return entity;
  }

  async getStats() {
    return this.accountRepository.getStats();
  }
}
