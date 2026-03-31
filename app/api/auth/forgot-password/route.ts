import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { createPasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/email'

const schema = z.object({
  email: z.string().email(),
})

// Generic success message to prevent email enumeration
const SUCCESS_MSG =
  "If an account exists for that email, we've sent a password reset link. Check your inbox."

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
    }

    const email = parsed.data.email.toLowerCase().trim()
    const [user] = await sql`SELECT id FROM "User" WHERE email = ${email} LIMIT 1`

    // Always return the same message regardless of whether the user exists
    if (!user) {
      return NextResponse.json({ message: SUCCESS_MSG })
    }

    const token = await createPasswordResetToken(email)
    await sendPasswordResetEmail(email, token)

    return NextResponse.json({ message: SUCCESS_MSG })
  } catch (err) {
    console.error('[FORGOT-PASSWORD]', err)
    return NextResponse.json({ error: 'Request failed. Please try again.' }, { status: 500 })
  }
}
