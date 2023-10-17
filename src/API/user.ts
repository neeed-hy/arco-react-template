import { useQuery } from '@tanstack/react-query';
// 默认的mockjs不能拦截fetch，因此在mock阶段需使用axios；后续解决这个问题
import axios from 'axios';

import { IRes } from '@/types/common';

const getUserinfo = () => {
  return axios.get<IRes<UserInfo>>(`/api/user/userInfo`);
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
