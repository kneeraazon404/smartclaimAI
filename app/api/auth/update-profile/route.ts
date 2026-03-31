import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
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

    const [updated] = await sql`
      UPDATE "User" SET name = ${parsed.data.name}, "updatedAt" = NOW()
      WHERE id = ${session.user.id}
      RETURNING id, name, email
    `

    return NextResponse.json({ user: updated })
  } catch (err) {
    console.error('[UPDATE-PROFILE]', err)
    return NextResponse.json({ error: 'Update failed. Please try again.' }, { status: 500 })
  }
}
