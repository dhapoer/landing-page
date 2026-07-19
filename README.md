# Portfolio — landing-page

Personal portfolio built with **SvelteKit + TypeScript**, deployed to **Cloudflare Pages** via **GitHub Actions**.

## Edit your content

All copy lives in one file: [`src/lib/data.ts`](src/lib/data.ts) — name, bio, interests, experience, projects, skills, contact. Edit the placeholders, no markup changes needed.

## Develop

```sh
pnpm install
pnpm dev --open
```

## Build

```sh
pnpm check   # typecheck
pnpm build   # outputs to .svelte-kit/cloudflare
```

## Deploy (Cloudflare Pages + GitHub Actions)

Push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): typecheck → build → deploy. PRs run the gate but skip deploy.

One-time setup:

1. **Create the Pages project** (name must match the workflow — `landing-page`):
   ```sh
   npx wrangler pages project create landing-page --production-branch main
   ```
2. **Add GitHub repo secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN` — token with the *Cloudflare Pages: Edit* permission
   - `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard URL / Workers & Pages overview

Then push to `main`.
