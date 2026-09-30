import { handleShareImage } from '../../../server/share.js';

export function onRequestGet(context) {
  return handleShareImage(context, 'user', context.params.handle);
}
