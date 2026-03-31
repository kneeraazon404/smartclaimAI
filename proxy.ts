/**
 * Next.js 16 proxy (replaces middleware.ts).
 *
 * Uses an edge-safe config (auth.config.ts) — no Prisma, no Node-only modules.
 * Route-protection logic lives in authConfig.callbacks.authorized.
 * The full auth config (with Prisma + Credentials) stays in lib/auth.ts.
 */
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

const { auth } = NextAuth(authConfig)

export default auth

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|favicon-.*\\.png|apple-touch-icon\\.png|site\\.webmanifest).*)',
  ],
}
