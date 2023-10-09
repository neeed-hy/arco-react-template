import './user';
import './message-box';
import './account';

import Mock from 'mockjs';

import { isSSR } from '@/utils/is';

if (!isSSR) {
  Mock.setup({
    timeout: '500-1500',
  });
}
