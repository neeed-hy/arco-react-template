export interface Account {
  id: number;
  accountName: string;
}

export type CreateAccount = Omit<Account, 'id'>;
export type EditAccount = Account;

export interface AccountFilter {
  accountName?: string;
}
