import { accountHandlers } from './account';
import { userHandlers } from './user';

export const handlers = [].concat(accountHandlers).concat(userHandlers);
