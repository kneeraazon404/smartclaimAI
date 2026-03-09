import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const usernames = ["kneeraazon", "karkidai", "admin"];
  const hashedPassword = await hash("karki99#$", 10);

  for (const username of usernames) {
    const email = `${username}@gmail.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name: username,
      },
      create: {
        email,
        name: username,
        password: hashedPassword,
      },
    });

    console.log("Seeded database with user:", user.email);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
