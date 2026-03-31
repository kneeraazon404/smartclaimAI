import { randomBytes, randomUUID } from 'crypto'
import { sql } from './db'

/** 256-bit URL-safe hex token */
function generateToken(): string {
  return randomBytes(32).toString('hex')
}

// ─── Email Verification ───────────────────────────────────────────────────────

export async function createVerificationToken(email: string): Promise<string> {
  await sql`DELETE FROM "EmailVerificationToken" WHERE email = ${email}`

  const token = generateToken()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 h
  const id = randomUUID()

  await sql`
    INSERT INTO "EmailVerificationToken" (id, email, token, expires, "createdAt")
    VALUES (${id}, ${email}, ${token}, ${expires}, NOW())
  `
  return token
}

export async function validateVerificationToken(
  token: string
): Promise<{ email: string } | { error: string }> {
  const rows = await sql`
    SELECT * FROM "EmailVerificationToken" WHERE token = ${token} LIMIT 1
  `
  const record = rows[0]

  if (!record) return { error: 'Invalid or already-used verification link.' }

  if (record.expires < new Date()) {
    await sql`DELETE FROM "EmailVerificationToken" WHERE token = ${token}`
    return { error: 'This verification link has expired. Please register again.' }
  }

  await sql`DELETE FROM "EmailVerificationToken" WHERE token = ${token}`
  return { email: record.email }
}

// ─── Password Reset ───────────────────────────────────────────────────────────

export async function createPasswordResetToken(email: string): Promise<string> {
  await sql`DELETE FROM "PasswordResetToken" WHERE email = ${email}`

  const token = generateToken()
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 h
  const id = randomUUID()

  await sql`
    INSERT INTO "PasswordResetToken" (id, email, token, expires, "createdAt")
    VALUES (${id}, ${email}, ${token}, ${expires}, NOW())
  `
  return token
}

export async function validatePasswordResetToken(
  token: string
): Promise<{ email: string } | { error: string }> {
  const rows = await sql`
    SELECT * FROM "PasswordResetToken" WHERE token = ${token} LIMIT 1
  `
  const record = rows[0]

  if (!record) return { error: 'Invalid or already-used reset link.' }

  if (record.expires < new Date()) {
    await sql`DELETE FROM "PasswordResetToken" WHERE token = ${token}`
    return { error: 'This reset link has expired. Please request a new one.' }
  }

  return { email: record.email }
}

export async function consumePasswordResetToken(token: string): Promise<void> {
  await sql`DELETE FROM "PasswordResetToken" WHERE token = ${token}`
}
