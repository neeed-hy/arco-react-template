import axios from 'axios';

export const request = axios.create({});

/**
 * 请求拦截器
 */
request.interceptors.request.use((config) => {
  // 发送请求之前去掉请求中的undefined
  for (const key in config.params) {
    if (config.params[key] === undefined) {
      delete config.params[key];
    }
  }
  return config;
});
