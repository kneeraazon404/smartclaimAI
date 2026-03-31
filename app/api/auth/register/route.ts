import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { createVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/email'

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 422 }
      )
    }

    const { name, email, password } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    const [existing] = await sql`
      SELECT id FROM "User" WHERE email = ${normalizedEmail} LIMIT 1
    `

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)
    const id = randomUUID()

    await sql`
      INSERT INTO "User" (id, name, email, password, "createdAt", "updatedAt")
      VALUES (${id}, ${name.trim()}, ${normalizedEmail}, ${hashedPassword}, NOW(), NOW())
    `

    const token = await createVerificationToken(normalizedEmail)
    await sendVerificationEmail(normalizedEmail, token)

    return NextResponse.json(
      { message: 'Account created. Please check your email to verify your account.' },
      { status: 201 }
    )
  } catch (err) {
    console.error('[REGISTER]', err)
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
