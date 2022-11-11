import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { UpdateBalanceType } from '../account.types';

export class UpdateAccountBalanceDto {
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @IsEnum(UpdateBalanceType)
  @IsNotEmpty()
  type: UpdateBalanceType;
}
