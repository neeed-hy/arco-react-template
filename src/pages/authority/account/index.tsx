import {
  accountApiKey,
  useCerateAccount,
  useEditAccount,
  useGetAccountList,
  useRemoveAccount,
} from '@/API/account';
import PageContainer from '@/components/PageContainer';
import { useEditDrawer } from '@/hooks/useEditDrawer';
import { Account, CreateAccount, EditAccount } from '@/types/account';
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
import EditDrawer from './components/EditDrawer';

const AccountManage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: accountList, isLoading, isError, error } = useGetAccountList();
  const cerateAccountMutation = useCerateAccount();
  const editAccountMutation = useEditAccount();
  const removeAccountMutation = useRemoveAccount();
  const reGetAccountList = () => {
    queryClient.invalidateQueries([accountApiKey.getAccountList]);
  };

  const submitTheData = (data: Account) => {
    if (!data.id) {
      createAccount(data);
    } else {
      editAccount(data);
    }
  };
  const createAccount = (data: CreateAccount) => {
    cerateAccountMutation.mutate(data, {
      onSuccess: () => {
        reGetAccountList();
      },
    });
  };
  const editAccount = (data: EditAccount) => {
    editAccountMutation.mutate(data, {
      onSuccess: () => {
        reGetAccountList();
      },
    });
  };
  const {
    setTitle,
    title,
    submitData,
    visible,
    toggleDrawerVisible,
    dataToBeEdited,
    setDataToBeEdited,
  } = useEditDrawer(submitTheData);

  const createBtnClickBtnClick = () => {
    setTitle('创建用户');
    toggleDrawerVisible(true);
  };
  const editBtnClick = (data: Account) => {
    setTitle('编辑用户');
    setDataToBeEdited(data);
    toggleDrawerVisible(true);
  };
  const removeBtnClick = (data: Account) => {
    const param = { id: data.id };
    removeAccountMutation.mutate(param, {
      onSuccess: () => {
        reGetAccountList();
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
          <Button type="primary" onClick={createBtnClickBtnClick}>
            创建用户
          </Button>
        }
      >
        <Table rowKey="id" columns={columns} data={accountList || []} />
      </PageContainer>
      <EditDrawer
        title={title}
        visible={visible}
        rawData={dataToBeEdited}
        toggleVisible={toggleDrawerVisible}
        submitData={submitData}
      />
    </>
  );
};
export default AccountManage;
