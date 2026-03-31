import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { validatePasswordResetToken, consumePasswordResetToken } from '@/lib/tokens'

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 422 }
      )
    }

    const { token, password } = parsed.data
    const result = await validatePasswordResetToken(token)

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    const [user] = await sql`SELECT id FROM "User" WHERE email = ${result.email} LIMIT 1`
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const hashedPassword = await hash(password, 10)

    await sql`
      UPDATE "User" SET password = ${hashedPassword}, "updatedAt" = NOW()
      WHERE email = ${result.email}
    `

    await consumePasswordResetToken(token)

    return NextResponse.json({ message: 'Password reset successfully. You can now sign in.' })
  } catch (err) {
    console.error('[RESET-PASSWORD]', err)
    return NextResponse.json({ error: 'Reset failed. Please try again.' }, { status: 500 })
  }
}
