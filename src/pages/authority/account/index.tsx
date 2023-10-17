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
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  accountApiKey,
  useCerateAccount,
  useEditAccount,
  useGetAccountList,
  useRemoveAccount,
} from '@/API/account';
import { IGetAccountListRes } from '@/API/account.api';
import PageContainer from '@/components/PageContainer';
import { useEditDrawer } from '@/hooks/useEditDrawer';
import {
  Account,
  AccountFilter,
  CreateAccount,
  EditAccount,
} from '@/types/account';
import { IRes } from '@/types/common';
import { RouteTarget } from '@/utils/routeTarget';

import EditDrawer from './components/EditDrawer';
import FilterForm from './components/FilterForm';

const AccountManage: React.FC = () => {
  const queryClient = useQueryClient();
  const cerateAccountMutation = useCerateAccount();
  const editAccountMutation = useEditAccount();
  const removeAccountMutation = useRemoveAccount();
  const reGetAccountList = () => {
    queryClient.invalidateQueries([accountApiKey.getAccountList, filterData]);
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
        toggleDrawerVisible(false);
      },
    });
  };
  const editAccount = (data: EditAccount) => {
    editAccountMutation.mutate(data, {
      onSuccess: () => {
        // reGetAccountList();
        // Updates From Mutation Responses
        queryClient.setQueryData(
          [accountApiKey.getAccountList, filterData],
          (oldData: IRes<IGetAccountListRes>) => {
            const accountList = oldData.data.accountList;
            const newAccountList = accountList.map((item) => {
              return item.id === data.id ? data : item;
            });
            return {
              ...oldData,
              data: {
                ...oldData.data,
                accountList: newAccountList,
              },
            };
          }
        );
        toggleDrawerVisible(false);
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
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const filterData = {
    pageNo: Number(searchParams.get('pageNo')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
    accountName: searchParams.get('accountName') || undefined,
  };
  const pagination: PaginationProps = {
    sizeCanChange: true,
    showTotal: true,
    pageSizeChangeResetCurrent: true,
    current: filterData.pageNo,
    pageSize: filterData.pageSize,
  };
  const {
    data: getAccountListRes,
    isLoading,
    isError,
    error,
  } = useGetAccountList(filterData);

  const handleFilter = (newFilterData: AccountFilter) => {
    const { pageSize } = pagination;
    history.push(
      RouteTarget.accountList({
        pageSize,
        pageNo: 1,
        ...newFilterData,
      })
    );
  };
  const onChangeTable = (currentPagination: PaginationProps) => {
    const { current, pageSize } = currentPagination;
    history.push(
      RouteTarget.accountList({
        ...filterData,
        pageSize,
        pageNo: current,
      })
    );
  };

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
        <FilterForm submitFilter={handleFilter} />
        <Divider />
        <Table
          rowKey="id"
          columns={columns}
          data={getAccountListRes?.accountList || []}
          onChange={onChangeTable}
          pagination={{ ...pagination, total: getAccountListRes?.total || 0 }}
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
