import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import prisma from './db'
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
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user?.password) return null

          const passwordsMatch = await compare(
            credentials.password as string,
            user.password
          )

          if (!passwordsMatch) return null

          return { id: user.id, name: user.name, email: user.email }
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
        // Store as boolean: true if emailVerified is a Date (truthy), false otherwise
        const dbUser = user as unknown as { emailVerified?: Date | null }
        token.emailVerified = !!dbUser.emailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        // Expose emailVerified on the session user for client-side access
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).emailVerified = token.emailVerified ?? false
      }
      return session
    },
  },
})
