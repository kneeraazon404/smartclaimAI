import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { sql } from './db'
import { authConfig } from '@/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'SmartClaimAI',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const [user] = await sql`
            SELECT id, name, email, password, "emailVerified"
            FROM "User"
            WHERE email = ${credentials.email as string}
            LIMIT 1
          `

          if (!user?.password) return null

          const passwordsMatch = await compare(
            credentials.password as string,
            user.password as string
          )

          if (!passwordsMatch) return null

          return {
            id: user.id as string,
            name: user.name as string | null,
            email: user.email as string,
            emailVerified: user.emailVerified as Date | null,
          }
        } catch (error) {
          console.error('[AUTH] authorize error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        const dbUser = user as unknown as { emailVerified?: Date | null }
        token.emailVerified = !!dbUser.emailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).emailVerified = token.emailVerified ?? false
      }
      return session
    },
  },
})
