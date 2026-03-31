/**
 * Email utility.
 *
 * - Production: uses Resend (set RESEND_API_KEY + EMAIL_FROM env vars).
 * - Development: logs the email/URL to the console so you can test without
 *   a real email provider.
 */
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM = process.env.EMAIL_FROM ?? 'SmartClaimAI <noreply@smartclaimai.com>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

function devLog(label: string, email: string, url: string) {
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`[DEV EMAIL] ${label}`)
  console.log(`  To : ${email}`)
  console.log(`  URL: ${url}`)
  console.log('─'.repeat(60) + '\n')
}

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${SITE_URL}/verify-email?token=${token}`

  if (!resend) {
    devLog('Verify Email', to, url)
    return
  }

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Verify your SmartClaimAI account',
    html: `
      <p>Welcome to SmartClaimAI!</p>
      <p>Please verify your email address by clicking the link below:</p>
      <p><a href="${url}">Verify Email Address</a></p>
      <p>This link expires in <strong>24 hours</strong>.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `,
  })
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const url = `${SITE_URL}/reset-password?token=${token}`

  if (!resend) {
    devLog('Password Reset', to, url)
    return
  }

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Reset your SmartClaimAI password',
    html: `
      <p>You requested a password reset for your SmartClaimAI account.</p>
      <p>Click the link below to set a new password:</p>
      <p><a href="${url}">Reset Password</a></p>
      <p>This link expires in <strong>1 hour</strong>.</p>
      <p>If you didn't request this, ignore this email — your password won't change.</p>
    `,
  })
}
