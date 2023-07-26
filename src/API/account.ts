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
        content: '添加成功!',
      });
    },
    onError: (err) => {
      console.error(err);
      Message.error({
        content: '添加失败，详细信息请查看控制台',
      });
    },
  });
};
