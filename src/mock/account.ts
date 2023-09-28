import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';
import { Account } from '@/types/account';
import { successWrap } from './util';
import { IGetAccountList } from '@/API/account.api';
const Random = Mock.Random;

const mockAccountList = (count: number) => {
  const dataList: Account[] = [];
  for (let i = 0; i < count; i += 1) {
    dataList.push({
      id: Number(Random.id()),
      accountName: i === 0 ? '第一个' : Random.cname(),
    });
  }
  const result: IGetAccountList = {
    accountList: dataList,
    total: count,
  };
  return result;
};
setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/account/list'), () => {
      return successWrap(mockAccountList(10));
    });
  },
  mock: true,
});
