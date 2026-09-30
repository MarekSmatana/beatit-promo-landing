const SITE_ORIGIN = 'https://getbeatit.app';
const APP_STORE_URL = 'https://apps.apple.com/app/id6778069102';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.builditstudio.beatit';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HANDLE_PATTERN = /^[a-z0-9][a-z0-9._]{1,28}[a-z0-9]$/;
const SAFE_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic', 'image/heif']);

export function validShareId(kind, value) {
  return kind === 'user' ? HANDLE_PATTERN.test(value) : UUID_PATTERN.test(value);
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function responseHeaders(contentType) {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
}

function pageShell({ title, description, imageUrl, canonicalUrl, body, status = 200 }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeImageUrl = escapeHtml(imageUrl);
  const safeCanonicalUrl = escapeHtml(canonicalUrl);
  return new Response(`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${safeTitle} | Beat It</title><meta name="description" content="${safeDescription}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Beat It">
<meta property="og:title" content="${safeTitle}"><meta property="og:description" content="${safeDescription}">
<meta property="og:url" content="${safeCanonicalUrl}"><meta property="og:image" content="${safeImageUrl}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDescription}"><meta name="twitter:image" content="${safeImageUrl}">
<meta name="apple-itunes-app" content="app-id=6778069102"><link rel="canonical" href="${safeCanonicalUrl}">
<link rel="icon" href="/brand/favicon.png">
<style>
  *{box-sizing:border-box}body{margin:0;background:#09090b;color:#fff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
  main{min-height:100vh;display:grid;place-items:center;padding:28px 18px;background:radial-gradient(circle at 50% 0%,#5b1118 0,#09090b 48%)}
  .card{width:min(100%,460px);border:1px solid #3f3f46;background:#18181b;border-radius:28px;padding:28px;text-align:center;box-shadow:0 22px 80px #0007}
  .brand{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-weight:900;letter-spacing:.14em;text-transform:uppercase;font-size:14px}
  .brand img{width:28px;height:28px;border-radius:7px}.preview-image{display:block;width:104px;height:104px;object-fit:cover;border-radius:22px;margin:28px auto 0;background:#27272a}
  .preview-image.post{width:100%;height:220px;border-radius:18px}h1{font-size:28px;line-height:1.15;margin:22px 0 8px}p{color:#a1a1aa;line-height:1.5;margin:0}.eyebrow{margin-top:24px;font-size:12px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:#ef4444}.actions{display:grid;gap:10px;margin-top:28px}
  .button{display:block;border-radius:14px;padding:14px 18px;text-decoration:none;font-weight:800;background:#ef4444;color:#fff}.button:hover{opacity:.88}
  .share-actions{width:300px;max-width:100%;margin-left:auto;margin-right:auto}.share-actions .button{display:grid;place-items:center;min-height:48px;padding:10px 6px}
  .store-badges{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin-top:4px}.store-badge{display:inline-block;border-radius:6px;transition:transform .2s ease}.store-badge:hover{transform:scale(1.05)}.store-badge:focus-visible{outline:2px solid #ef4444;outline-offset:4px}.store-badge img{display:block;width:144px;height:48px}.hint{margin-top:20px;font-size:12px}
  @media(max-width:393px){.share-actions{width:144px}.store-badges{flex-direction:column}.share-actions .button{font-size:14px}}
</style></head><body><main><section class="card"><a class="brand" href="/"><img src="/brand/app-icon.png" alt="">Beat It</a>${body}</section></main></body></html>`, {
    status,
    headers: responseHeaders('text/html; charset=utf-8'),
  });
}

function buttons(appPath) {
  return `<nav class="actions share-actions" aria-label="Open or install Beat It">
    <a class="button" href="beatit://${appPath}">Open in Beat It</a>
    <div class="store-badges">
      <a class="store-badge" href="${APP_STORE_URL}"><img src="/badges/app-store-light.svg" alt="Download on the App Store" width="144" height="48"></a>
      <a class="store-badge" href="${PLAY_STORE_URL}"><img src="/badges/google-play-light.svg" alt="Get it on Google Play" width="144" height="48"></a>
    </div>
  </nav><p class="hint">Already installed? Open the shared link again to go straight to this page in the app.</p>`;
}

export function renderUnavailable(path, status = 404) {
  return pageShell({
    title: 'Content unavailable',
    description: 'This Beat It link is no longer available.',
    imageUrl: `${SITE_ORIGIN}/brand/app-icon.png`,
    canonicalUrl: `${SITE_ORIGIN}${path}`,
    body: '<p class="eyebrow">Shared link</p><h1>Content unavailable</h1><p>This profile or post may have been removed or made private.</p><nav class="actions"><a class="button" href="/">Visit Beat It</a></nav>',
    status,
  });
}

export function renderTemporaryError(path) {
  return pageShell({
    title: 'Try again later',
    description: 'This Beat It preview is temporarily unavailable.',
    imageUrl: `${SITE_ORIGIN}/brand/app-icon.png`,
    canonicalUrl: `${SITE_ORIGIN}${path}`,
    body: '<p class="eyebrow">Shared link</p><h1>Try again later</h1><p>We could not load this preview right now.</p>',
    status: 503,
  });
}

export async function fetchSharePreview(env, kind, id) {
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) throw new Error('Supabase preview configuration is missing.');
  const rpc = kind === 'user' ? 'get_shared_profile' : 'get_shared_post';
  const payload = kind === 'user' ? { target_username: id } : { target_post_id: id };
  const endpoint = `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${rpc}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Preview lookup failed (${response.status}).`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] ?? null : null;
}

export function renderSharePreview(kind, id, preview) {
  const path = `/${kind}/${encodeURIComponent(id)}`;
  const canonicalUrl = `${SITE_ORIGIN}${path}`;
  const imageUrl = kind === 'user'
    ? preview.avatar_path ? `${SITE_ORIGIN}/share-image/user/${encodeURIComponent(id)}` : `${SITE_ORIGIN}/brand/app-icon.png`
    : preview.photo_path ? `${SITE_ORIGIN}/share-image/post/${encodeURIComponent(id)}` : `${SITE_ORIGIN}/brand/app-icon.png`;
  if (kind === 'user') {
    const name = preview.display_name || preview.username;
    const image = preview.avatar_path ? `<img class="preview-image" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(name)}'s profile photo">` : '<img class="preview-image" src="/brand/app-icon.png" alt="">';
    return pageShell({
      title: `${name} (@${preview.username})`,
      description: `View ${name}'s public profile on Beat It.`,
      imageUrl, canonicalUrl,
      body: `${image}<p class="eyebrow">Athlete profile</p><h1>${escapeHtml(name)}</h1><p>@${escapeHtml(preview.username)}</p>${buttons(`user/${encodeURIComponent(id)}`)}`,
    });
  }
  const owner = preview.owner_display_name || preview.owner_username;
  const image = preview.photo_path ? `<img class="preview-image post" src="${escapeHtml(imageUrl)}" alt="Workout photo">` : '<img class="preview-image" src="/brand/app-icon.png" alt="">';
  const completedDate = new Date(preview.completed_at);
  const dateLabel = Number.isNaN(completedDate.getTime()) ? '' : ` · ${completedDate.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}`;
  return pageShell({
    title: `${preview.title} by ${owner}`,
    description: `View ${owner}'s public workout on Beat It.`,
    imageUrl, canonicalUrl,
    body: `${image}<p class="eyebrow">Workout post</p><h1>${escapeHtml(preview.title)}</h1><p>By ${escapeHtml(owner)}${escapeHtml(dateLabel)}</p>${buttons(`post/${encodeURIComponent(id)}`)}`,
  });
}

export async function handleSharePage(context, kind, id) {
  const path = `/${kind}/${encodeURIComponent(id)}`;
  if (!validShareId(kind, id)) return renderUnavailable(path);
  try {
    const preview = await fetchSharePreview(context.env, kind, id);
    return preview ? renderSharePreview(kind, id, preview) : renderUnavailable(path);
  } catch (error) {
    console.error('Share preview failed.', error);
    return renderTemporaryError(path);
  }
}

export async function handleShareImage(context, kind, id) {
  if (!validShareId(kind, id)) return new Response(null, { status: 404, headers: responseHeaders('text/plain') });
  try {
    const preview = await fetchSharePreview(context.env, kind, id);
    const bucket = kind === 'user' ? preview?.avatar_bucket : preview?.photo_bucket;
    const path = kind === 'user' ? preview?.avatar_path : preview?.photo_path;
    const expectedBucket = kind === 'user' ? 'profile-avatars' : 'workout-photos';
    if (!path || bucket !== expectedBucket) return new Response(null, { status: 404, headers: responseHeaders('text/plain') });
    const encodedPath = path.split('/').map(encodeURIComponent).join('/');
    const endpoint = `${context.env.SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/authenticated/${bucket}/${encodedPath}`;
    const image = await fetch(endpoint, { headers: { apikey: context.env.SUPABASE_PUBLISHABLE_KEY } });
    if (!image.ok) return new Response(null, { status: image.status === 404 || image.status === 403 ? 404 : 502, headers: responseHeaders('text/plain') });
    const contentType = (image.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
    if (!SAFE_IMAGE_TYPES.has(contentType)) return new Response(null, { status: 502, headers: responseHeaders('text/plain') });
    return new Response(image.body, { headers: responseHeaders(contentType) });
  } catch (error) {
    console.error('Share image failed.', error);
    return new Response(null, { status: 503, headers: responseHeaders('text/plain') });
  }
}
