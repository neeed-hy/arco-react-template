export interface Account {
  id: number;
  accountName: string;
}

export type CreateAccount = Omit<Account, 'id'>;
