import { faker } from '@faker-js/faker/locale/zh_CN';
import { rest } from 'msw';
import qs from 'query-string';

import { IGetAccountListRes } from '@/API/account.api';
import { Account } from '@/types/account';

import { successWrap } from '../util';

const makeMockAccountList = (count: number) => {
  const dataList: Account[] = [];
  for (let i = 0; i < count; i += 1) {
    dataList.push({
      id: i,
      accountName: i === 0 ? '第一个' : faker.person.fullName(),
    });
  }
  return dataList;
};
const mockAccountList = makeMockAccountList(108);

export const accountHandlers = [
  rest.get(new RegExp('/api/account/list'), (req, res, ctx) => {
    const queryParam = qs.parseUrl(req.url.href).query;
    const pageSize = Number(queryParam.pageSize);
    const pageNo = Number(queryParam.pageNo);
    const dataList = mockAccountList.slice(
      0 + pageSize * (pageNo - 1),
      pageSize + pageSize * (pageNo - 1)
    );
    const result: IGetAccountListRes = {
      accountList: dataList,
      total: mockAccountList.length,
    };
    return res(ctx.delay(1000), ctx.json(successWrap(result)));
  }),
];
