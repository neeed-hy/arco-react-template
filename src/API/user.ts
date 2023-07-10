import { IRes } from '@/types/common';
import { request } from './request';
import { useQuery } from '@tanstack/react-query';

const getUserinfo = () => {
  return request.get<IRes<UserInfo>>(`/api/user/userInfo`);
};

export const userApiKey = {
  getUserinfo: 'getUserinfo',
};

export const useGetUserInfo = () => {
  return useQuery([userApiKey.getUserinfo], () => getUserinfo(), {
    select: (data) => {
      return data.data.data;
    },
  });
};
