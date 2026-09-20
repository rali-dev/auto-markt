import 'dotenv/config';
import process from 'node:process';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { productsList } from './productsList';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL ist nicht gesetzt (siehe .env im Repo-Root)');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  console.log(`Seeding ${productsList.length} products...`);

  for (const product of productsList) {
    await prisma.product.upsert({
      where: { stripePriceId: product.stripePriceId },
      update: product,
      create: product,
    });
    console.log(`  + ${product.name}`);
  }

  console.log(
    `Seeding finished: ${productsList.length} products synchronised.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
