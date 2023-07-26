import {
  accountApiKey,
  useCerateAccount,
  useGetAccountList,
} from '@/API/account';
import PageContainer from '@/components/PageContainer';
import { Account, CreateAccount } from '@/types/account';
import {
  Button,
  Divider,
  Message,
  Popconfirm,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const AccountManage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: accountList, isLoading, isError, error } = useGetAccountList();
  const cerateAccountMutation = useCerateAccount();

  const addBtnClick = () => {
    console.log('add');
  };
  const editBtnClick = (data: Account) => {
    console.log(data);
  };
  const removeBtnClick = (data: Account) => {
    console.log(data);
  };

  const createAccount = (data: CreateAccount) => {
    cerateAccountMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries([accountApiKey.getAccountList]);
      },
      onSettled: () => {
        // toggleDrawerVisible(false);
      },
    });
  };

  const columns: TableColumnProps<Account>[] = [
    {
      title: '用户名称',
      dataIndex: 'accountName',
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      align: 'center',
      render(col, item) {
        return (
          <>
            <Button
              size="small"
              type="outline"
              onClick={() => {
                editBtnClick(item);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              focusLock
              title="操作确认"
              position="left"
              content={`确认删除用户【${item.accountName}】?`}
              onOk={() => {
                removeBtnClick(item);
              }}
            >
              <Button size="small" type="primary" status="danger">
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    if (isError) {
      Message.error('获取用户列表信息失败');
      console.error(error);
    }
  }, [isError, error]);
  return (
    <>
      <PageContainer
        title="用户管理"
        isLoading={isLoading}
        extra={
          <Button type="primary" onClick={addBtnClick}>
            添加用户
          </Button>
        }
      >
        <Table rowKey="id" columns={columns} data={accountList || []} />
      </PageContainer>
    </>
  );
};
export default AccountManage;
