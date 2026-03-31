import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/db'
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

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: parsed.data.name },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json({ user: updated })
  } catch (err) {
    console.error('[UPDATE-PROFILE]', err)
    return NextResponse.json({ error: 'Update failed. Please try again.' }, { status: 500 })
  }
}
