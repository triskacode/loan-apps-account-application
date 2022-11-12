import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePaymentIntens {
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;
}
