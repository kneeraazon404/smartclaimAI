import { randomBytes } from 'crypto'
import prisma from './db'

/** 256-bit URL-safe hex token */
function generateToken(): string {
  return randomBytes(32).toString('hex')
}

// ─── Email Verification ───────────────────────────────────────────────────────

export async function createVerificationToken(email: string): Promise<string> {
  // Invalidate any previous token for this email
  await prisma.emailVerificationToken.deleteMany({ where: { email } })

  const token = generateToken()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 h

  await prisma.emailVerificationToken.create({ data: { email, token, expires } })
  return token
}

export async function validateVerificationToken(
  token: string
): Promise<{ email: string } | { error: string }> {
  const record = await prisma.emailVerificationToken.findUnique({ where: { token } })

  if (!record) return { error: 'Invalid or already-used verification link.' }

  if (record.expires < new Date()) {
    await prisma.emailVerificationToken.delete({ where: { token } })
    return { error: 'This verification link has expired. Please register again.' }
  }

  // Consume token immediately
  await prisma.emailVerificationToken.delete({ where: { token } })
  return { email: record.email }
}

// ─── Password Reset ───────────────────────────────────────────────────────────

export async function createPasswordResetToken(email: string): Promise<string> {
  await prisma.passwordResetToken.deleteMany({ where: { email } })

  const token = generateToken()
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 h

  await prisma.passwordResetToken.create({ data: { email, token, expires } })
  return token
}

export async function validatePasswordResetToken(
  token: string
): Promise<{ email: string } | { error: string }> {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } })

  if (!record) return { error: 'Invalid or already-used reset link.' }

  if (record.expires < new Date()) {
    await prisma.passwordResetToken.delete({ where: { token } })
    return { error: 'This reset link has expired. Please request a new one.' }
  }

  return { email: record.email }
}

export async function consumePasswordResetToken(token: string): Promise<void> {
  await prisma.passwordResetToken.deleteMany({ where: { token } })
}
