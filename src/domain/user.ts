export class User {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly state: UserState;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export enum UserRole {
  MANAGER = 'manager',
  USER = 'user',
}

export enum UserState {
  CREATED = 'created',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}
