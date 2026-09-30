# Cloudflare Pages Deployment

This project is a static Vite React site. Cloudflare should build it with:

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22.16.0` from `.node-version`
- Wrangler Pages output: `./dist` from `wrangler.jsonc`

## Option A: Git Integration

Use this for automatic deployments after every push.

1. Push this `beatit-promo-landing` repository to GitHub or GitLab.
2. Open the Cloudflare dashboard.
3. Go to **Workers & Pages**.
4. Select **Create application**.
5. Select **Pages**.
6. Select **Import an existing Git repository**.
7. Choose the repository that contains `beatit-promo-landing`.
8. Configure the build:
   - Project name: `beatit-promo-landing`
   - Production branch: `main`
   - Framework preset: `React (Vite)` or `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank if the repository root is `beatit-promo-landing`; otherwise set it to `beatit-promo-landing`.
9. Save and deploy.
10. Wait until Cloudflare shows the first deployment as successful.
11. Open the generated `*.pages.dev` URL and check:
    - `/`
    - `/privacy/`
    - `/terms/`
    - `/contact/`

## Option B: Direct Upload With Wrangler

Use this if you want to deploy from your computer without Git-based auto deploys.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Log in to Cloudflare:

   ```bash
   npx wrangler login
   ```

3. Create the Pages project if it does not exist yet:

   ```bash
   npx wrangler pages project create
   ```

   When prompted, use `beatit-promo-landing` as the project name and `main` as the production branch.

4. Build and deploy:

   ```bash
   npm run deploy:cloudflare
   ```

5. Open the generated `*.pages.dev` URL and verify the routes listed above.

## Attach `getbeatit.app`

1. In Cloudflare, go to **Workers & Pages**.
2. Open the `beatit-promo-landing` Pages project.
3. Go to **Custom domains**.
4. Select **Set up a domain**.
5. Enter `getbeatit.app`.
6. Continue and let Cloudflare create or confirm the DNS record.
7. Wait for the custom domain to show **Active**.
8. Visit `https://getbeatit.app/`.

For `www.getbeatit.app`, repeat the custom domain flow with `www.getbeatit.app`. Then create a Cloudflare **Rules > Redirect Rules** rule to redirect `www.getbeatit.app/*` to `https://getbeatit.app/$1` with status `301`.

## Local Checks

Before deploying a new version:

```bash
npm run build
npm run preview
```

Then open the local preview URL and check `/`, `/privacy/`, `/terms/`, and `/contact/`.

The build also includes a top-level `404.html`. Keep it in the output so a missing JavaScript asset returns a real 404 instead of the homepage HTML. Do not set a long-lived immutable cache header on `/assets/*` responses: a temporary HTML fallback at a script URL can otherwise leave browsers with a blank page. If this happens on the custom domain, inspect the script request's **Content-Type** and **CF-Cache-Status** in the browser Network panel. Purge the affected `getbeatit.app/assets` prefix in **Cloudflare → getbeatit.app → Caching → Configuration → Custom Purge**, then reload and confirm the script is served as JavaScript.

## Shareable profile and post links

The site serves `https://getbeatit.app/user/<handle>` and `https://getbeatit.app/post/<post-UUID>` through Cloudflare Pages Functions. Each page loads the current public preview from Supabase. Its image endpoint checks visibility again for every request. Private, deleted, or moderation-hidden content returns a generic unavailable page. A released handle resolves to whoever currently owns it; old handles are not redirected or reserved.

### One-time setup and release order

1. In **Workers & Pages → beatit-promo-landing → Custom domains**, confirm `getbeatit.app` is **Active**. Shared links use the apex domain, so a `www` redirect alone is insufficient.
2. In Supabase, apply `BeatIt/supabase/migrations/056_public_share_previews.sql` with the project's normal migration process before deploying these Pages Functions. It adds anonymous read-only preview RPCs and a scoped anonymous Storage download policy. Both `profile-avatars` and `workout-photos` must stay **private** buckets. Do not turn on public bucket access.
3. In **Supabase → Project Settings → API Keys**, copy the project URL and a **publishable** key. In **Cloudflare → Workers & Pages → beatit-promo-landing → Settings → Variables and Secrets**, set `SUPABASE_URL` to the project URL and `SUPABASE_PUBLISHABLE_KEY` to that key for **Production**. Set them for **Preview** too if you test preview deployments. Do not set a service-role or secret key. Redeploy after adding or changing bindings.
4. Confirm the association files in `public/.well-known/` before deploying. The Apple file uses Team ID `2MDWH3923S` and bundle ID `com.builditstudio.beatit`; confirm the Team ID in Apple Developer. The Android file uses package `com.builditstudio.beatit` and Google Play **App signing key certificate** SHA-256 fingerprint `3E:1E:A1:45:E6:8C:8F:31:94:F4:32:DE:55:22:AE:89:91:21:3F:F7:6E:46:8B:2C:7A:9F:55:9C:B7:D7:B4:0F`. If Play Console shows a different app-signing fingerprint, update `assetlinks.json`. The upload-key fingerprint is not the one delivered to Play users.
5. Deploy this site through its connected Git integration or `npm run deploy:cloudflare`. The Vite build copies `public/.well-known/` and `public/_headers` into `dist`; Pages deploys the `functions/` routes alongside it. A local `vite preview` shows only static files, so it cannot exercise the share pages.
6. Verify both `https://getbeatit.app/.well-known/apple-app-site-association` and `https://getbeatit.app/.well-known/assetlinks.json` return HTTP **200**, `Content-Type: application/json`, and the checked-in JSON directly over HTTPS. They must not require a login, issue a redirect, or show a Cloudflare challenge. Then open a known public `/user/<handle>` and `/post/<post-UUID>` URL in a browser and inspect the title, image, buttons, and Open Graph tags. Test a private or deleted item and confirm the generic unavailable page and a 404 from its `/share-image/...` URL.
7. Create new **production** iOS and Android app builds from `BeatIt/app.config.ts`. Associated Domains and verified Android intent filters are native settings; an over-the-air update cannot add them. If iOS signing reports an entitlement error, enable **Associated Domains** for the production App ID in Apple Developer and refresh the provisioning profile. Distribute first with TestFlight and a Google Play internal test. A development build uses the `.dev` app ID and intentionally does not claim the production domain.
8. With Beat It absent, open both URL types and confirm the preview and both store buttons. Install a new build, then **tap** each URL in Messages, Notes, or another app. Confirm the exact profile/post opens on iOS and Android, including after sign-in, onboarding, and the social terms gate. Also test the preview's **Open in Beat It** button when the page is already in a browser. Check Share in the public profile header, feed post menu, profile post menu, and workout detail; confirm it is absent for private profiles/posts and unpublished posts without a server post ID. Change a handle and confirm its former URL becomes unavailable, then assign that handle to another account and confirm the URL points to its current owner. On Android, inspect app-link verification in system settings or with `adb shell pm get-app-links com.builditstudio.beatit` if a tap remains in the browser. Chat apps can retain a card they fetched before content became private. After installation, the user taps the original link again; there is no deferred deep link.

The association formats follow the [Expo iOS Universal Links guide](https://docs.expo.dev/linking/ios-universal-links/), [Expo Android App Links guide](https://docs.expo.dev/linking/android-app-links/), and [Android asset links requirements](https://developer.android.com/training/app-links/configure-assetlinks). The website routes use [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/routing/) and [environment bindings](https://developers.cloudflare.com/pages/functions/bindings/).
