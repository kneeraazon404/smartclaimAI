import { NextRequest, NextResponse } from 'next/server'
import { hash, compare } from 'bcryptjs'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'

const schema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .max(128),
})

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 422 }
      )
    }

    const { currentPassword, newPassword } = parsed.data

    const [user] = await sql`
      SELECT id, password FROM "User" WHERE id = ${session.user.id} LIMIT 1
    `

    if (!user?.password) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const passwordsMatch = await compare(currentPassword, user.password as string)
    if (!passwordsMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect.' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(newPassword, 10)
    await sql`
      UPDATE "User" SET password = ${hashedPassword}, "updatedAt" = NOW()
      WHERE id = ${session.user.id}
    `

    return NextResponse.json({ message: 'Password updated successfully.' })
  } catch (err) {
    console.error('[UPDATE-PASSWORD]', err)
    return NextResponse.json({ error: 'Update failed. Please try again.' }, { status: 500 })
  }
}
