import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole, UserState } from 'src/domain/user';

export class DeleteAccountDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  email?: string;

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
