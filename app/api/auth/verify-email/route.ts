import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateVerificationToken } from '@/lib/tokens'

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is required.' }, { status: 400 })
    }

    const result = await validateVerificationToken(token)

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: result.email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Email already verified.' })
    }

    await prisma.user.update({
      where: { email: result.email },
      data: { emailVerified: new Date() },
    })

    return NextResponse.json({ message: 'Email verified successfully. You can now sign in.' })
  } catch (err) {
    console.error('[VERIFY-EMAIL]', err)
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 })
  }
}
