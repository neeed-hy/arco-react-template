import HttpRequestMock from 'http-request-mock';

import { generatePermission } from '@/routes';
import { isSSR } from '@/utils/is';
import setupMock from '@/utils/setupMock';

const mocker = HttpRequestMock.setup();
const faker = HttpRequestMock.faker;

if (!isSSR) {
  setupMock({
    setup: () => {
      // 用户信息
      const userRole = window.localStorage.getItem('userRole') || 'admin';
      mocker.mock({
        url: new RegExp('/api/user/userInfo'),
        body: {
          code: 200,
          msg: '',
          data: {
            name: '王立群',
            avatar:
              'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
            email: 'wangliqun@email.com',
            job: 'frontend',
            jobName: '前端开发工程师',
            organization: 'Frontend',
            organizationName: '前端',
            location: 'beijing',
            locationName: '北京',
            introduction: '王力群并非是一个真实存在的人。',
            personalWebsite: 'https://www.arco.design',
            verified: true,
            phoneNumber: /177[*]{6}[0-9]{2}/,
            accountId: /[a-z]{4}[-][0-9]{8}/,
            registrationTime: faker.datetime(Date.now()),
            permissions: generatePermission(userRole),
          },
        },
      });
      mocker.mock({
        url: new RegExp('/api/user/login'),
        response(requestInfo) {
          const { userName, password } = requestInfo.body;
          if (userName === 'admin' && password === 'admin') {
            return {
              status: 'ok',
            };
          }
          return {
            status: 'error',
            msg: '账号或者密码错误',
          };
        },
      });
    },
    mock: true,
  });
}
