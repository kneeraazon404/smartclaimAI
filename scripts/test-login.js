const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "kneeraazon@gmail.com";
  const password = "karki99#$";

  console.log("Looking up user:", email);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("User not found!");
    return;
  }

  console.log("User found:", user);

  const passwordsMatch = await bcrypt.compare(password, user.password);
  console.log("Passwords match:", passwordsMatch);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
