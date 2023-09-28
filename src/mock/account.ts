import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';
import { Account } from '@/types/account';
const Random = Mock.Random;

const mockAccountList = () => {
  const result: Account[] = [];
  result.push(
    {
      id: Number(Random.id()),
      accountName: Random.cname(),
    },
    {
      id: Number(Random.id()),
      accountName: Random.cname(),
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
