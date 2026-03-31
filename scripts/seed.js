/**
 * Development seed script.
 *
 * Usage:
 *   SEED_USER_EMAIL=you@example.com SEED_USER_PASSWORD=yourpassword node scripts/seed.js
 *
 * Or with multiple users defined below (no passwords — configure via env).
 * Passwords are NEVER hardcoded in this file.
 */
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_USER_EMAIL
  const password = process.env.SEED_USER_PASSWORD
  const name = process.env.SEED_USER_NAME ?? email?.split('@')[0] ?? 'User'

  if (!email || !password) {
    console.error('Error: Set SEED_USER_EMAIL and SEED_USER_PASSWORD environment variables.')
    console.error('Example: SEED_USER_EMAIL=you@example.com SEED_USER_PASSWORD=secret node scripts/seed.js')
    process.exit(1)
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, name, emailVerified: new Date() },
    create: { email, name, password: hashedPassword, emailVerified: new Date() },
  })

  console.log(`Seeded user: ${user.email} (id: ${user.id})`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
