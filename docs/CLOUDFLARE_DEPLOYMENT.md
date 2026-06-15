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
