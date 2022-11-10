import { User } from 'src/domain/user';
import Stripe from 'stripe';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  id!: number;

  @Column({ unique: true })
  @Index()
  customer_id!: string;

  @Column({ default: 0 })
  loan_balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
