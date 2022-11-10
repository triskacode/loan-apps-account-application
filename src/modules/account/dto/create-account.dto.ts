import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole, UserState } from 'src/domain/user';

export class CreateAccountDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  role?: UserRole;

  @IsEnum(UserState)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  state?: UserState;
}
