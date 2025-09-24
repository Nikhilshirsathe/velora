const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    // Test connection and count products
    const productCount = await prisma.product.count();
    console.log(`✅ Database connected successfully!`);
    console.log(`📦 Total products in database: ${productCount}`);
    
    // Get sample products
    const sampleProducts = await prisma.product.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        price: true,
        category: true
      }
    });
    
    console.log(`\n📋 Sample products:`);
    sampleProducts.forEach(product => {
      console.log(`- ${product.name} (₹${product.price}) - ${product.category}`);
    });
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();