import { accountHandlers } from './account';
import { messageHandlers } from './message-box';
import { userHandlers } from './user';

export const handlers = []
  .concat(accountHandlers)
  .concat(userHandlers)
  .concat(messageHandlers);
