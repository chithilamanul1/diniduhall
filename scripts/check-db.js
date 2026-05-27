const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Checking database...");
  try {
    const categories = await prisma.category.findMany({
      include: { items: true }
    });
    console.log("Categories found:", categories.length);
    for (const cat of categories) {
      console.log(`Category: ${cat.name}`);
      for (const item of cat.items) {
        console.log(`  - [${item.tag || 'No Tag'}] ${item.name} (${item.price})`);
      }
    }
  } catch (err) {
    console.error("Error checking database:", err);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
