import Mock from 'mockjs';

import { IGetAccountListRes } from '@/API/account.api';
import { Account } from '@/types/account';
import setupMock from '@/utils/setupMock';

import { getUrlParam, successWrap } from './util';
const Random = Mock.Random;

const makeMockAccountList = (count: number) => {
  const dataList: Account[] = [];
  for (let i = 0; i < count; i += 1) {
    dataList.push({
      id: i,
      accountName: i === 0 ? '第一个' : Random.cname(),
    });
  }
  return dataList;
};

const mockAccountList: Account[] = makeMockAccountList(108);

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/account/list'), (option) => {
      const pageSize = Number(getUrlParam(option, 'pageSize'));
      const pageNo = Number(getUrlParam(option, 'pageNo'));
      const dataList = mockAccountList.slice(
        0 + pageSize * (pageNo - 1),
        pageSize + pageSize * (pageNo - 1)
      );
      const result: IGetAccountListRes = {
        accountList: dataList,
        total: mockAccountList.length,
      };
      return successWrap(result);
    });
  },
  mock: true,
});
