import { MockjsRequestOptions } from 'mockjs';

export function successWrap(data: any) {
  return {
    code: 200,
    msg: '',
    data,
  };
}

export function getUrlParam(option: MockjsRequestOptions, target: string) {
  const locationSearch = option.url.split('?')[1];
  const params = new URLSearchParams(locationSearch);
  return params.get(target);
}
