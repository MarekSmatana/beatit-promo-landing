import { handleSharePage } from '../../server/share.js';

export function onRequestGet(context) {
  return handleSharePage(context, 'post', context.params.id);
}
