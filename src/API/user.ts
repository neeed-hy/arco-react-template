import { useQuery } from '@tanstack/react-query';

import { IRes } from '@/types/common';

import { request } from './request';

const getUserinfo = () => {
  return request.get(`/api/user/userInfo`).json<IRes<UserInfo>>();
};

export const userApiKey = {
  getUserinfo: 'getUserinfo',
};

export const useGetUserInfo = () => {
  return useQuery([userApiKey.getUserinfo], () => getUserinfo(), {
    select: (data) => {
      return data.data;
    },
  });
};
