const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAuthSystem() {
  try {
    // Test users
    const userCount = await prisma.user.count();
    console.log(`👥 Total users in database: ${userCount}`);
    
    if (userCount > 0) {
      const sampleUsers = await prisma.user.findMany({
        take: 3,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });
      
      console.log(`\n📋 Sample users:`);
      sampleUsers.forEach(user => {
        console.log(`- ${user.name} (${user.email}) - Created: ${user.createdAt.toDateString()}`);
      });
    }
    
    // Test orders
    const orderCount = await prisma.order.count();
    console.log(`\n📦 Total orders in database: ${orderCount}`);
    
    if (orderCount > 0) {
      const sampleOrders = await prisma.order.findMany({
        take: 3,
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      
      console.log(`\n📋 Sample orders:`);
      sampleOrders.forEach(order => {
        console.log(`- Order ${order.id} by ${order.user.name} - ₹${order.total} - ${order.status}`);
      });
    }
    
    console.log(`\n🔍 System Status:`);
    console.log(`- User registration: ${userCount > 0 ? '✅ Working' : '❌ No users found'}`);
    console.log(`- Order system: ${orderCount > 0 ? '✅ Working' : '⚠️ No orders yet'}`);
    
  } catch (error) {
    console.error('❌ Auth system test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthSystem();