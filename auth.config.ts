/**
 * Edge-safe auth config — imported by both middleware.ts (Edge Runtime)
 * and lib/auth.ts (Node.js runtime). Must NOT import Prisma, bcryptjs,
 * or any Node-only module.
 */
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      const protectedRoutes = ['/evaluate', '/settings']
      const guestOnlyRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

      const isProtected = protectedRoutes.some((r) => pathname.startsWith(r))
      const isGuestOnly = guestOnlyRoutes.some((r) => pathname.startsWith(r))

      if (isProtected && !isLoggedIn) {
        const loginUrl = new URL('/login', nextUrl)
        loginUrl.searchParams.set('from', pathname + nextUrl.search)
        return Response.redirect(loginUrl)
      }

      if (isGuestOnly && isLoggedIn) {
        return Response.redirect(new URL('/evaluate', nextUrl))
      }

      return true
    },
  },
} satisfies NextAuthConfig
