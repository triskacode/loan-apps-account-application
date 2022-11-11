import { UserRole, UserState } from 'src/domain/user';

export class FilterFindAllUserDto {
  role?: UserRole;
  state?: UserState;
}
