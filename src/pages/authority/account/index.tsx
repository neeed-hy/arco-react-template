import {
  accountApiKey,
  useCerateAccount,
  useEditAccount,
  useGetAccountList,
  useRemoveAccount,
} from '@/API/account';
import PageContainer from '@/components/PageContainer';
import { useEditDrawer } from '@/hooks/useEditDrawer';
import {
  Account,
  AccountFilter,
  CreateAccount,
  EditAccount,
} from '@/types/account';
import {
  Button,
  Divider,
  Message,
  PaginationProps,
  Popconfirm,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EditDrawer from './components/EditDrawer';
import FilterForm from './components/FilterForm';
import { useHistory } from 'react-router-dom';
import { RouteTarget } from '@/utils/routeTarget';

const AccountManage: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: getAccountListRes,
    isLoading,
    isError,
    error,
  } = useGetAccountList();
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

  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const filterData = {
    pageNo: Number(searchParams.get('pageNo')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
    accountName: searchParams.get('accountName') || undefined,
  };
  const handleFilter = (newFilterData: AccountFilter) => {
    const { pageSize } = pagination;
    history.push(
      RouteTarget.accountList({
        pageSize,
        pageNo: 1,
        ...newFilterData,
      })
    );
    console.log(newFilterData);
  };
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSizeChangeResetCurrent: true,
    current: filterData.pageNo,
    pageSize: filterData.pageSize,
    total: 99,
  });
  const onChangeTable = (currentPagination: PaginationProps) => {
    const { current, pageSize } = currentPagination;
    history.push(
      RouteTarget.accountList({
        pageSize,
        pageNo: current,
      })
    );
    setPagination({ ...pagination, current, pageSize });
  };
  // useEffect(() => {
  //   if (pagination && getAccountListRes) {
  //     setPagination({ ...pagination, total: getAccountListRes.total });
  //   }
  // }, [pagination, getAccountListRes]);

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
        <FilterForm submitFilter={handleFilter} />
        <Divider />
        <Table
          rowKey="id"
          columns={columns}
          data={getAccountListRes?.accountList || []}
          onChange={onChangeTable}
          pagination={pagination}
        />
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
