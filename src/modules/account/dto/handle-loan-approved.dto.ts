import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { LoanState } from 'src/domain/loan';

export class HandleLoanApprovedDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @IsEnum(LoanState)
  @IsNotEmpty()
  state: LoanState;
}
