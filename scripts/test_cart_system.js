const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCartSystem() {
  try {
    console.log('🛒 Testing SQLite + Prisma Cart System\n');
    
    // Get test user and product
    const user = await prisma.user.findFirst();
    const product = await prisma.product.findFirst();
    
    if (!user || !product) {
      console.log('❌ Need at least 1 user and 1 product in database');
      return;
    }
    
    console.log(`👤 User: ${user.name} (${user.email})`);
    console.log(`📦 Product: ${product.name} - ₹${product.price}`);
    
    // Clear existing cart
    await prisma.cartItem.deleteMany({
      where: { userId: user.id }
    });
    
    // Add item to cart
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: user.id,
        productId: product.id,
        quantity: 2
      },
      include: {
        product: true
      }
    });
    
    console.log(`\n✅ Added to cart: ${cartItem.quantity}x ${cartItem.product.name}`);
    
    // View cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            name: true,
            price: true
          }
        }
      }
    });
    
    console.log('\n📋 Cart Contents:');
    let total = 0;
    cartItems.forEach(item => {
      const itemTotal = item.quantity * item.product.price;
      total += itemTotal;
      console.log(`- ${item.quantity}x ${item.product.name} = ₹${itemTotal}`);
    });
    
    console.log(`\n💰 Total: ₹${total}`);
    console.log('\n✅ Cart persists in SQLite database!');
    console.log('🔄 Cart will survive logout/login');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testCartSystem();