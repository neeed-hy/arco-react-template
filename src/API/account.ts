import { IRes } from '@/types/common';
import { request } from './request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Account, CreateAccount } from '@/types/account';
import { Message } from '@arco-design/web-react';

const getAccountList = () => {
  return request.get<IRes<Account[]>>(`/api/account/list`);
};
const createNewAccount = (data: CreateAccount) => {
  return request.post<IRes<null>>('/api/account/create', data);
};
const editAccount = (data: CreateAccount) => {
  return request.post<IRes<null>>('/api/account/edit', data);
};

export const accountApiKey = {
  getAccountList: 'getAccountList',
};

/**
 * 获取用户列表
 * @returns
 */
export const useGetAccountList = () => {
  return useQuery([accountApiKey.getAccountList], () => getAccountList(), {
    select: (data) => {
      return data.data.data;
    },
  });
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
      }
      Message.success({
        content: '创建用户成功!',
      });
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
      }
      Message.success({
        content: '编辑用户成功!',
      });
    },
    onError: (err) => {
      console.error(err);
      Message.error({
        content: `编辑用户失败：${err}`,
      });
    },
  });
};
