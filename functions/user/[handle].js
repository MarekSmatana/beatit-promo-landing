import { handleSharePage } from '../../server/share.js';

export function onRequestGet(context) {
  return handleSharePage(context, 'user', context.params.handle);
}
