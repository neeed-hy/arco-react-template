import { Message } from '@arco-design/web-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { CreateAccount } from '@/types/account';
import { IRes } from '@/types/common';

import { IGetAccountList, IGetAccountListRes } from './account.api';
import { request } from './request';

const getAccountList = (params: IGetAccountList) => {
  return request.get<IRes<IGetAccountListRes>>(`/api/account/list`, {
    params,
  });
};
const createNewAccount = (data: CreateAccount) => {
  return request.post<IRes<null>>('/api/account/create', data);
};
const editAccount = (data: CreateAccount) => {
  return request.post<IRes<null>>('/api/account/edit', data);
};
const removeAccount = (data: { id: number }) => {
  return request.post<IRes<null>>('/api/account/remove', data);
};

export const accountApiKey = {
  getAccountList: 'getAccountList',
};

/**
 * 获取用户列表
 * @returns
 */
export const useGetAccountList = (params: IGetAccountList) => {
  return useQuery(
    [accountApiKey.getAccountList, params],
    () => getAccountList(params),
    {
      select: (data) => {
        return data.data.data;
      },
      keepPreviousData: true,
    }
  );
};

/**
 * 添加用户
 * @returns
 */
export const useCerateAccount = () => {
  return useMutation({
    mutationFn: (data: CreateAccount) => {
      return createNewAccount(data);
    },
    onSuccess: (res) => {
      const { data } = res;
      if (data.code !== 200) {
        throw data.msg;
      } else {
        Message.success({
          content: '创建用户成功!',
        });
      }
    },
    onError: (err) => {
      console.error(err);
      Message.error({
        content: `创建用户失败：${err}`,
      });
    },
  });
};

/**
 * 编辑用户
 * @returns
 */
export const useEditAccount = () => {
  return useMutation({
    mutationFn: (data: CreateAccount) => {
      return editAccount(data);
    },
    onSuccess: (res) => {
      const { data } = res;
      if (data.code !== 200) {
        throw data.msg;
      } else {
        Message.success({
          content: '编辑用户成功!',
        });
      }
    },
    onError: (err) => {
      console.error(err);
      Message.error({
        content: `编辑用户失败：${err}`,
      });
    },
  });
};
/**
 * 删除用户
 * @returns
 */
export const useRemoveAccount = () => {
  return useMutation({
    mutationFn: (data: { id: number }) => {
      return removeAccount(data);
    },
    onSuccess: (res) => {
      const { data } = res;
      if (data.code !== 200) {
        throw data.msg;
      } else {
        Message.success({
          content: '删除用户成功!',
        });
      }
    },
    onError: (err) => {
      console.error(err);
      Message.error({
        content: `删除用户失败：${err}`,
      });
    },
  });
};
