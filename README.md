# SmartClaimAI

An AI-powered clinical assistant for wound care providers. Evaluates wound care checklists against CMS Medicare LCD L35041 guidelines (Skin Substitutes and CTPs) and returns instant, field-level pass/fail feedback with clinical reasoning.

## Features

- **AI Evaluation** — GPT-4o evaluates clinical data against Medicare LCD Novitas guidelines
- **Multi-step Wizard** — Structured form with per-step validation (react-hook-form + Zod)
- **Actionable Feedback** — Field-level pass/fail highlighting with clinical reasoning
- **Full Auth System** — Register, login, email verification, forgot/reset password, profile & password update
- **Assistant Chat** — Floating AI chat widget on the homepage (Vercel AI SDK)
- **Dark / Light / System Theme** — class-based theming via next-themes, no flash on load
- **Accessible** — WCAG-aligned: labeled inputs, ARIA roles, semantic HTML, keyboard navigation
- **SEO-ready** — Open Graph, Twitter cards, sitemap, robots, per-page metadata

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4, Framer Motion |
| Auth | Auth.js v5 (NextAuth), bcryptjs |
| Database ORM | Prisma (SQLite dev / PostgreSQL prod) |
| Cloud DB | Supabase (PostgreSQL) |
| AI Evaluation | OpenAI GPT-4o (structured output) |
| AI Chat | Vercel AI SDK + Anthropic Claude |
| Forms | react-hook-form + Zod |
| Theme | next-themes |

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd smartclaimai
yarn install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
# Database (SQLite for local dev, PostgreSQL for production)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth — generate with: openssl rand -base64 32
AUTH_SECRET="your-auth-secret"

# Your deployed URL (required for NextAuth redirects in production)
AUTH_URL="https://your-domain.vercel.app"

# Supabase — for storing evaluation results
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# OpenAI — for wound checklist evaluation
OPENAI_API_KEY="sk-..."

# Anthropic — for the homepage chat assistant
ANTHROPIC_API_KEY="sk-ant-..."

# Site URL — used for sitemap + OG metadata
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
```

### 3. Initialize the database

```bash
yarn prisma generate
yarn prisma db push

# Optional: seed a test user
node scripts/seed.js
```

### 4. Run in development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

### Local production build

```bash
yarn build
yarn start
```

`prisma generate` runs automatically before `next build` (configured in `package.json`).

### Vercel deployment

1. Push to GitHub and connect the repo in the Vercel dashboard.
2. Add all environment variables from the `.env` section above in **Vercel → Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://smartclaimai.vercel.app`).
4. Deploy. Vercel runs `yarn build` which includes `prisma generate`.

> **Database**: The production app uses Supabase PostgreSQL. Update `DATABASE_URL` in Vercel to the Supabase connection string and run `prisma db push` once to create the schema.

## Theme behavior

- Defaults to the user's **system preference** (light or dark).
- The toggle in the header switches between light and dark and persists via `localStorage`.
- `next-themes` with `attribute="class"` applies the `.dark` class to `<html>`.
- `suppressHydrationWarning` on `<html>` and `<body>` prevents React hydration mismatches.
- Native browser elements (scrollbars, inputs) follow the theme via `color-scheme` CSS.

## Architecture notes

### Component split

- `app/page.tsx` — server component (hero + features). `ChatWidget` is lazy-loaded client component (`dynamic` with `ssr: false`) to minimize initial JS bundle.
- `app/login/LoginForm.tsx` — client component extracted so `app/login/page.tsx` can be a server component and export `metadata`.
- `components/ChatWidget.tsx` — client component (floating AI chat, lazy-loaded).

### Authentication & middleware

**Middleware proxy pattern (Next.js 16 + Auth.js v5):**
- `auth.config.ts` — edge-safe config (no Prisma). Contains route-protection logic in the `authorized` callback.
- `middleware.ts` — thin proxy: `NextAuth(authConfig)`. Runs in the Edge Runtime. Never imports Prisma or Node-only modules.
- `lib/auth.ts` — full server-side config with Credentials provider + Prisma. Used only in API routes and Server Components.

**Auth routes:**
| Route | Description |
|---|---|
| `POST /api/auth/register` | Create account (hashes password, sends verification email) |
| `POST /api/auth/verify-email` | Consume email verification token |
| `POST /api/auth/forgot-password` | Generate + email password reset token |
| `POST /api/auth/reset-password` | Set new password using token |
| `PUT /api/auth/update-password` | Change password (auth required) |
| `PUT /api/auth/update-profile` | Update display name (auth required) |

**Auth pages:** `/register`, `/verify-email`, `/forgot-password`, `/reset-password`, `/settings`

**Protected routes:** `/evaluate`, `/settings` — redirect to `/login?from=<path>` if unauthenticated.
**Guest-only routes:** `/login`, `/register`, `/forgot-password`, `/reset-password` — redirect to `/evaluate` if already authenticated.

**Seed a development user:**
```bash
SEED_USER_EMAIL=you@example.com SEED_USER_PASSWORD=YourPassword node scripts/seed.js
```
The seed script requires env vars — no passwords are ever hardcoded in committed files.

**`/api/evaluate` additionally verifies the session server-side before calling OpenAI, preventing unauthenticated API abuse.**

### Security headers

Applied globally via `next.config.ts`:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security` (HSTS, 2 years)
- `X-DNS-Prefetch-Control: on`
- `X-Powered-By` header removed (`poweredByHeader: false`)

### SEO

- Root `metadata` in `app/layout.tsx` sets default title, OG, Twitter, icons, and manifest.
- Per-page metadata uses `template: '%s | SmartClaimAI'`.
- `/evaluate` and `/login` are excluded from indexing (`robots: noindex`).
- `app/sitemap.ts` generates `/sitemap.xml` with public pages.
- `app/robots.ts` generates `/robots.txt` disallowing `/evaluate` and `/api/`.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for correct sitemap URLs.

## Environment variable reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Prisma DB connection string |
| `AUTH_SECRET` | Yes | NextAuth signing secret |
| `AUTH_URL` | Prod | Full URL for NextAuth callbacks |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `OPENAI_API_KEY` | Yes | OpenAI API key (GPT-4o evaluation) |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key (chat assistant) |
| `RESEND_API_KEY` | Optional | Resend API key for transactional email. Without it, emails are logged to the console (dev mode). |
| `EMAIL_FROM` | Optional | From address for emails. Defaults to `SmartClaimAI <noreply@smartclaimai.com>`. |
| `NEXT_PUBLIC_SITE_URL` | Prod | Canonical site URL for SEO metadata |
