import assert from 'node:assert/strict';
import test from 'node:test';

import { handleShareImage, handleSharePage, renderSharePreview, validShareId } from '../server/share.js';

const postId = 'cdd552e2-d454-4b37-a344-0e8f6ae79b2e';
const env = { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' };

test('preview IDs are constrained to exact handles and UUIDs', () => {
  assert.equal(validShareId('user', 'ferino'), true);
  assert.equal(validShareId('user', '../admin'), false);
  assert.equal(validShareId('post', postId), true);
  assert.equal(validShareId('post', 'not-a-uuid'), false);
});

test('dynamic chat metadata escapes user content', async () => {
  const response = renderSharePreview('user', 'ferino', {
    username: 'ferino', display_name: '<script>alert(1)</script>', avatar_path: 'photo.png',
  });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /og:title.*&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /og:image.*share-image\/user\/ferino/);
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
});

test('private or removed content gives no preview or image', async () => {
  const previousFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response('[]', { status: 200, headers: { 'content-type': 'application/json' } });
  };
  try {
    const page = await handleSharePage({ env }, 'post', postId);
    const image = await handleShareImage({ env }, 'post', postId);
    assert.equal(page.status, 404);
    assert.equal(image.status, 404);
    assert.equal(calls.length, 2);
    assert.ok(calls.every((url) => url.endsWith('/rest/v1/rpc/get_shared_post')));
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('public post image is checked again before downloading', async () => {
  const previousFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return calls.length === 1
      ? new Response(JSON.stringify([{ photo_bucket: 'workout-photos', photo_path: 'owner/photo.png' }]), { status: 200 })
      : new Response('image-data', { status: 200, headers: { 'content-type': 'image/png' } });
  };
  try {
    const image = await handleShareImage({ env }, 'post', postId);
    assert.equal(image.status, 200);
    assert.equal(image.headers.get('cache-control'), 'no-store');
    assert.equal(calls.length, 2);
    assert.match(calls[1], /\/storage\/v1\/object\/authenticated\/workout-photos\/owner\/photo.png$/);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('image proxy rejects active content formats', async () => {
  const previousFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return calls === 1
      ? new Response(JSON.stringify([{ avatar_bucket: 'profile-avatars', avatar_path: 'owner/avatar.svg' }]), { status: 200 })
      : new Response('<svg onload="alert(1)"></svg>', { status: 200, headers: { 'content-type': 'image/svg+xml' } });
  };
  try {
    const image = await handleShareImage({ env }, 'user', 'ferino');
    assert.equal(image.status, 502);
  } finally {
    globalThis.fetch = previousFetch;
  }
});
