import { Account } from '@/types/account';

export interface IGetAccountList {
  pageSize?: number;
  pageNo?: number;
  accountName?: string;
}
export interface IGetAccountListRes {
  total: number;
  accountList: Account[];
}
