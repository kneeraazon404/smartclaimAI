# SmartClaimAI

An AI-powered clinical compliance assistant for wound care providers. Evaluates wound care checklists against CMS Medicare LCD L35041 guidelines using GPT-4o structured output, delivering instant field-level pass/fail feedback with clinical reasoning.

## Features

- **AI Evaluation** — GPT-4o evaluates every checklist field against Medicare LCD Novitas guidelines for Skin Substitutes and CTPs
- **Multi-step Wizard** — Structured form with per-step validation (react-hook-form + Zod), Y/N toggle buttons, and contextual help tooltips
- **Evaluation Summary** — Instant compliance report with pass rate, progress bar, and grouped failure list
- **Form Draft Persistence** — Auto-saves progress to localStorage; restores session on reload
- **Print Report** — Print-optimized evaluation report via browser print dialog
- **Full Auth System** — Register, login, email verification, forgot/reset password, profile & password update
- **AI Chat Assistant** — Floating chat widget on the homepage powered by Vercel AI SDK + Anthropic Claude
- **Contact Page** — Demo requests, enterprise inquiries, and support via Resend email integration
- **Dark / Light / System Theme** — Class-based theming via next-themes, no flash on load
- **Accessible** — WCAG-aligned: labeled inputs, ARIA roles, semantic HTML, keyboard navigation, focus management
- **SEO-ready** — Open Graph, Twitter cards, JSON-LD structured data, sitemap, robots, per-page metadata
- **Secure** — Auth-protected API routes, Zod validation at every boundary, security headers including HSTS, CSP, COEP

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4, Framer Motion (wizard only) |
| Fonts | Inter (body/UI) + JetBrains Mono (code) via next/font |
| Auth | Auth.js v5 (NextAuth), bcryptjs |
| Database | Neon PostgreSQL (via `@neondatabase/serverless`) |
| ORM/Schema | Prisma (schema management + `prisma generate`) |
| AI Evaluation | OpenAI GPT-4o (structured output via Zod) |
| AI Chat | Vercel AI SDK + Anthropic Claude |
| Email | Resend (transactional) |
| Storage | Supabase (evaluation result persistence) |
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
# Neon PostgreSQL connection string
DATABASE_URL="postgresql://..."

# NextAuth — generate with: openssl rand -base64 32
AUTH_SECRET="your-auth-secret"

# Your deployed URL (required for NextAuth redirects in production)
AUTH_URL="https://your-domain.vercel.app"

# Supabase — for storing evaluation results
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# OpenAI — for wound checklist evaluation (GPT-4o)
OPENAI_API_KEY="sk-..."

# Anthropic — for the homepage chat assistant
ANTHROPIC_API_KEY="sk-ant-..."

# Resend — for transactional email (optional in development)
RESEND_API_KEY="re_..."

# Email sender address (optional, defaults to noreply@smartclaimai.com)
EMAIL_FROM="SmartClaimAI <noreply@smartclaimai.com>"

# Contact form destination email (optional, falls back to EMAIL_FROM address)
CONTACT_EMAIL="admin@smartclaimai.com"

# Canonical site URL — required for sitemap + OG metadata in production
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
```

**Development note:** Without `RESEND_API_KEY`, emails (verification, password reset, contact form) are logged to the console — no real email provider is required for local development.

### 3. Initialize the database

The app uses raw SQL via `@neondatabase/serverless`. The Prisma schema defines the tables; use Prisma to push the schema to your Neon database:

```bash
yarn prisma generate
yarn prisma db push
```

Seed a development user (optional):

```bash
SEED_USER_EMAIL=you@example.com SEED_USER_PASSWORD=YourPassword node scripts/seed.js
```

The seed script requires env vars — no credentials are hardcoded.

### 4. Run in development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

### Local production build

```bash
yarn build   # runs prisma generate && next build
yarn start
```

### Vercel deployment

1. Push to GitHub and connect the repo in the Vercel dashboard.
2. Add all environment variables from the `.env` section above under **Vercel → Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Deploy. Vercel runs `yarn build` which includes `prisma generate`.

## Scripts

| Script | Description |
|---|---|
| `yarn dev` | Start dev server with Turbopack |
| `yarn build` | Run `prisma generate` then `next build` |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn test` | Run Jest unit tests |
| `yarn test:watch` | Jest in watch mode |

## Architecture

### Routing

| Route | Visibility | Notes |
|---|---|---|
| `/` | Public | Homepage + AI chat |
| `/about` | Public | Product overview |
| `/faq` | Public | Accordion FAQ |
| `/contact` | Public | Demo/support inquiry form |
| `/evaluate` | **Auth required** | Multi-step checklist wizard |
| `/settings` | **Auth required** | Profile + password |
| `/login` | Guest only | Redirects authenticated users |
| `/register` | Guest only | — |
| `/forgot-password` | Guest only | — |
| `/reset-password` | Guest only | — |
| `/verify-email` | Public | Consumes token from email |

### API routes

| Route | Auth | Description |
|---|---|---|
| `POST /api/evaluate` | ✅ Required | GPT-4o wound checklist evaluation |
| `POST /api/chat` | ✗ Public | Streaming AI chat (Anthropic) |
| `POST /api/contact` | ✗ Public | Contact form → Resend email |
| `POST /api/auth/register` | ✗ | Create account |
| `POST /api/auth/verify-email` | ✗ | Consume email verification token |
| `POST /api/auth/forgot-password` | ✗ | Generate + email reset token |
| `POST /api/auth/reset-password` | ✗ | Set new password from token |
| `PUT /api/auth/update-password` | ✅ | Change password |
| `PUT /api/auth/update-profile` | ✅ | Update display name |

### Component architecture

- **`app/page.tsx`** — Server component (hero, features). `ChatWidget` is lazy-loaded with `ssr: false`.
- **`features/checklist/ChecklistWizard.tsx`** — Client component. Owns form state, step navigation, localStorage draft persistence, and evaluation summary.
- **`features/checklist/FormField.tsx`** — Renders Y/N/NA toggle button groups (not text inputs) for binary fields, with contextual help tooltips.
- **`components/Header.tsx`** — Client component. Sticky with backdrop blur, active-link highlighting, mobile hamburger menu with slide-down drawer.
- **`components/Footer.tsx`** — Server component. Full navigation + compliance info.
- **`components/BrandLogo.tsx`** — Reusable brand mark component using site icon assets.

### Authentication (Auth.js v5 pattern)

- **`auth.config.ts`** — Edge-safe config. No Prisma. Route protection in `authorized` callback.
- **`proxy.ts`** — Thin proxy (`NextAuth(authConfig)`). Runs on Edge Runtime. Protects `/evaluate` and `/settings`. Named `proxy.ts` per the Next.js 16 convention (renamed from `middleware.ts` in v16).
- **`lib/auth.ts`** — Full server-side config with Credentials provider + bcryptjs. Used in API routes and Server Components only.

### Database

User accounts and tokens are stored in Neon PostgreSQL via raw SQL (`@neondatabase/serverless`). Prisma is used only for schema management (`prisma db push`). Evaluation results are separately stored in Supabase via the `wound_checklist` table.

### Security headers

Applied globally via `next.config.ts`:

- `Strict-Transport-Security` (HSTS, 2 years, preload)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`
- `Cross-Origin-Resource-Policy: same-origin`
- `Content-Security-Policy: frame-ancestors 'none'; upgrade-insecure-requests`
- `X-Powered-By` header removed (`poweredByHeader: false`)

### SEO

- `metadataBase` uses `NEXT_PUBLIC_SITE_URL`.
- Title template `%s | SmartClaimAI` applied per-page.
- `/evaluate`, `/login`, `/settings` excluded from indexing.
- JSON-LD `SoftwareApplication` schema injected in root layout.
- `app/sitemap.ts` generates `/sitemap.xml` for all public pages.
- `app/robots.ts` disallows `/evaluate` and `/api/`.

### Theme

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- `ThemeToggle` uses `resolvedTheme` (not `theme`) for correct icon display on system theme.
- `color-scheme` CSS for native browser element theming.
- `suppressHydrationWarning` on `<html>` and `<body>`.

## Environment variable reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Yes | NextAuth signing secret (`openssl rand -base64 32`) |
| `AUTH_URL` | Production | Full URL for NextAuth callbacks |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `OPENAI_API_KEY` | Yes | OpenAI API key (GPT-4o evaluation) |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key (chat assistant) |
| `RESEND_API_KEY` | Optional | Resend API key (emails). Without it, emails log to console. |
| `EMAIL_FROM` | Optional | Sender address. Default: `SmartClaimAI <noreply@smartclaimai.com>` |
| `CONTACT_EMAIL` | Optional | Contact form destination. Falls back to EMAIL_FROM address. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL for SEO metadata and sitemaps |
