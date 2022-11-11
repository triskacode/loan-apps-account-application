import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserState } from 'src/domain/user';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
    private userService: UserService,
  ) {}

  async create(entity: Account): Promise<Account> {
    try {
      const newEntity = await this.repository.save(entity);

      return newEntity;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
        throw new BadRequestException('Account already exists');

      throw err;
    }
  }

  async update(entity: Account, updateSet: Partial<Account>): Promise<Account> {
    try {
      entity.email = updateSet.email ?? entity.email;
      entity.customer_id = updateSet.customer_id ?? entity.customer_id;
      entity.loan_balance = updateSet.loan_balance ?? entity.loan_balance;

      const newEntity = await this.repository.save(entity);

      return newEntity;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
        throw new BadRequestException('Account already exists');

      throw err;
    }
  }

  async delete(entity: Account): Promise<Account> {
    await this.repository.delete(entity.id);

    return entity;
  }

  async findById(id: Account['id']): Promise<Account> {
    return this.repository.createQueryBuilder('account').where({ id }).getOne();
  }

  async getStats() {
    const activeUsers = await this.userService.findAllUser({
      state: UserState.ACTIVE,
    });

    return activeUsers;
  }
}
