import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const getRole = await prisma.role.findFirst({
    where: {
      name: "Merchant",
      isSystem: true,
      isActive: true,
      tenantId: null,
    },
  });

  if (!getRole) {
    await prisma.role.create({
      data: {
        name: "Merchant",
        description: "Merchant role",
        tenantId: null,
        isSystem: true,
        isActive: true,
      },
    });
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
