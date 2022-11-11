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

  @Column({ unique: true })
  @Index()
  email!: string;

  @Column({ default: 0 })
  loan_balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
