import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
  ) {}

  async create(entity: Account): Promise<Account> {
    try {
      const newEntity = await this.repository.save(entity);
      console.log('create account', newEntity);

      return newEntity;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
        throw new BadRequestException('Account already exists');

      throw err;
    }
  }

  async delete(entity: Account): Promise<Account> {
    await this.repository.delete(entity.id);
    console.log('delete account', entity);

    return entity;
  }

  async findById(id: Account['id']): Promise<Account> {
    return this.repository.createQueryBuilder('account').where({ id }).getOne();
  }
}
