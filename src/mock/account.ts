import HttpRequestMock from 'http-request-mock';

import { IGetAccountListRes } from '@/API/account.api';
import { Account } from '@/types/account';
import setupMock from '@/utils/setupMock';

import { successWrap } from './util';
const mocker = HttpRequestMock.setup();
const faker = HttpRequestMock.faker;

const makeMockAccountList = (count: number) => {
  const dataList: Account[] = [];
  for (let i = 0; i < count; i += 1) {
    dataList.push({
      id: i,
      accountName: i === 0 ? '第一个' : faker.name(),
    });
  }
  return dataList;
};

const mockAccountList: Account[] = makeMockAccountList(108);

setupMock({
  setup: () => {
    mocker.mock({
      url: new RegExp('/api/account/list'),
      delay: 600,
      response(requestInfo) {
        const pageSize = Number(requestInfo.query.pageSize);
        const pageNo = Number(requestInfo.query.pageNo);
        const dataList = mockAccountList.slice(
          0 + pageSize * (pageNo - 1),
          pageSize + pageSize * (pageNo - 1)
        );
        const result: IGetAccountListRes = {
          accountList: dataList,
          total: mockAccountList.length,
        };
        return successWrap(result);
      },
    });
  },
  mock: true,
});
