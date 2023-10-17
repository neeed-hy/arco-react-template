import { Message } from '@arco-design/web-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Account, CreateAccount } from '@/types/account';
import { IRes } from '@/types/common';
import { getHasValue } from '@/utils/routeTarget';

import { IGetAccountList, IGetAccountListRes } from './account.api';
import { request } from './request';

const getAccountList = (params: IGetAccountList) => {
  return request
    .get('/api/account/list', {
      searchParams: new URLSearchParams(getHasValue(params)),
    })
    .json<IRes<IGetAccountListRes>>();
};
const createNewAccount = (data: CreateAccount) => {
  return request
    .post('/api/account/create', {
      json: data,
    })
    .json<IRes<Account>>();
};
const editAccount = (data: CreateAccount) => {
  return request
    .post('/api/account/edit', {
      json: data,
    })
    .json<IRes<Account>>();
};
const removeAccount = (data: { id: number }) => {
  return request
    .post('/api/account/remove', {
      json: data,
    })
    .json<IRes<Account>>();
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
        return data.data;
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
      if (res.code !== 200) {
        throw res.msg;
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
      if (res.code !== 200) {
        throw res.msg;
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
      if (res.code !== 200) {
        throw res.msg;
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
