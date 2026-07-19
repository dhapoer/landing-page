# dhapoer.xyz

Personal portfolio built with **SvelteKit + TypeScript**, deployed to **Cloudflare Pages** via **GitHub Actions**.

**Live:** [dhapoer.xyz](https://dhapoer.xyz) · fallback [landing-page-aeb.pages.dev](https://landing-page-aeb.pages.dev)

## Edit your content

All copy lives in one file: [`src/lib/data.ts`](src/lib/data.ts) — profile, bio, experience, projects, skills, education, awards. Edit it; no markup changes needed.

Adding a new section means editing [`src/routes/+page.svelte`](src/routes/+page.svelte): add the `<section id="...">`, and a matching link in the nav.

## Develop

```sh
pnpm install
pnpm dev --open
```

## Build

```sh
pnpm check   # typecheck + a11y lint (must be 0 errors, 0 warnings)
pnpm build   # outputs to .svelte-kit/cloudflare
pnpm preview # serves the built output
```

> `pnpm preview` serves a **snapshot** of the last build — it does not pick up rebuilds. After `pnpm build`, restart it or you'll be testing stale output.

## Deploy

Push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): install → typecheck → build → deploy. PRs run the gate but skip the deploy step.

Setup is complete; the notes below are for rebuilding from scratch.

<details>
<summary>One-time setup</summary>

1. **Create the Pages project** — `wrangler` does *not* auto-create it on first deploy:
   ```sh
   npx wrangler pages project create landing-page --production-branch main
   ```
   The public URL may get a suffix (`landing-page-aeb.pages.dev`) if the name is taken globally. The workflow's `--project-name` still uses the unsuffixed name.

2. **Add repo secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN` — needs *Cloudflare Pages: Edit*
   - `CLOUDFLARE_ACCOUNT_ID` — from the dashboard URL

3. **Custom domain** — Workers & Pages → the project → Custom domains. Cloudflare writes the DNS itself when the zone is on the same account.

</details>

## Notes

- **Adapter config lives in [`vite.config.ts`](vite.config.ts)**, not `svelte.config.js`. Adding a `svelte.config.js` is ignored and logs a warning.
- **Email is auto-obfuscated.** Cloudflare rewrites `mailto:` to `/cdn-cgi/l/email-protection`; it renders normally in a browser but looks scrambled in `curl`.
- **`Profile.pdf` is gitignored** — the LinkedIn resume export contains a phone number.
- Mobile nav collapses to a hamburger under 600px (Escape and link-click both close it).
