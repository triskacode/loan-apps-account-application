export class Loan {
  readonly id: number;
  readonly user_id: number;
  readonly amount: number;
  readonly state: LoanState;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export enum LoanState {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
