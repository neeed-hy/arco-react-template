import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';
import { Account } from '@/types/account';
const mockAccountList = () => {
  const result: Account[] = [];
  result.push(
    {
      id: 1,
      accountName: '第一个',
    },
    {
      id: 2,
      accountName: '第二个',
    }
  );
  return {
    code: 200,
    msg: '',
    data: result,
  };
};
setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/account/list'), () => {
      return mockAccountList();
    });
  },
  mock: true,
});
