import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Invalid email address'),
  organization: z.string().max(200).trim().optional(),
  inquiry: z.enum(['demo', 'enterprise', 'support', 'general'], {
    errorMap: () => ({ message: 'Please select an inquiry type.' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).trim(),
})

const INQUIRY_LABELS: Record<string, string> = {
  demo: 'Demo Request',
  enterprise: 'Enterprise / Multi-Clinic Plan',
  support: 'Technical Support',
  general: 'General Inquiry',
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const ADMIN_EMAIL =
  process.env.CONTACT_EMAIL ??
  process.env.EMAIL_FROM?.match(/<(.+)>/)?.[1] ??
  'contact@smartclaimai.com'
const FROM = process.env.EMAIL_FROM ?? 'SmartClaimAI <noreply@smartclaimai.com>'

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

    const { name, email, organization, inquiry, message } = parsed.data
    const inquiryLabel = INQUIRY_LABELS[inquiry] ?? inquiry

    if (resend) {
      await resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `[SmartClaimAI] ${inquiryLabel} from ${name}`,
        html: `
          <h2 style="margin-bottom:16px">New Contact Inquiry — SmartClaimAI</h2>
          <table style="border-collapse:collapse; width:100%; max-width:500px;">
            <tr><td style="padding:6px 0; font-weight:600; color:#374151; width:140px">Name</td><td style="padding:6px 0; color:#111827">${name}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600; color:#374151">Email</td><td style="padding:6px 0; color:#111827"><a href="mailto:${email}">${email}</a></td></tr>
            ${organization ? `<tr><td style="padding:6px 0; font-weight:600; color:#374151">Organization</td><td style="padding:6px 0; color:#111827">${organization}</td></tr>` : ''}
            <tr><td style="padding:6px 0; font-weight:600; color:#374151">Inquiry Type</td><td style="padding:6px 0; color:#111827">${inquiryLabel}</td></tr>
          </table>
          <hr style="margin:16px 0; border-color:#e5e7eb" />
          <h3 style="color:#374151; margin-bottom:8px">Message</h3>
          <p style="color:#111827; line-height:1.7; white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        `,
      })
    } else {
      // Dev mode: log to console
      console.log('\n' + '─'.repeat(60))
      console.log('[CONTACT FORM]')
      console.log(`  Name:         ${name}`)
      console.log(`  Email:        ${email}`)
      console.log(`  Organization: ${organization ?? '—'}`)
      console.log(`  Inquiry:      ${inquiryLabel}`)
      console.log(`  Message:\n${message.split('\n').map((l) => '    ' + l).join('\n')}`)
      console.log('─'.repeat(60) + '\n')
    }

    return NextResponse.json({
      message: "Your message has been sent. We'll be in touch within one business day.",
    })
  } catch (err) {
    console.error('[CONTACT]', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
