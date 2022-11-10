import { Injectable, NotFoundException } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    private stripeService: StripeService,
    private accountRepository: AccountRepository,
  ) {}

  async create(dto: CreateAccountDto) {
    const account = await this.accountRepository.findById(dto.id);
    if (account) return;

    const customer = await this.stripeService.createCustumer(dto.email);

    const entity = new Account();
    entity.id = dto.id;
    entity.customer_id = customer.id;

    return this.accountRepository.create(entity);
  }

  async delete(dto: DeleteAccountDto) {
    const entity = await this.accountRepository.findById(dto.id);

    if (!entity)
      throw new NotFoundException(`Account with id: ${dto.id} not found`);

    await this.stripeService.deleteCustumer(entity.customer_id);

    return this.accountRepository.delete(entity);
  }

  async findById(id: number): Promise<Account> {
    const entity = await this.accountRepository.findById(id);

    if (!entity)
      throw new NotFoundException(`Account with id: ${id} not found`);

    return entity;
  }
}
