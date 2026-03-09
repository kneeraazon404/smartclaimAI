import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import prisma from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "SmartClaimAI Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "doctor@clinic.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with email:", credentials?.email);
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })

          console.log("User found in DB:", !!user);

          if (!user || (!user.password)) {
            console.log("No user or no password found");
            return null
          }

          const passwordsMatch = await compare(
            credentials.password as string,
            user.password
          )

          console.log("Passwords match:", passwordsMatch);

          if (passwordsMatch) {
            return { id: user.id, name: user.name, email: user.email }
          }
        } catch (error) {
          console.error("Authorize error:", error);
        }

        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
})
