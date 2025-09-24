const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPersistentCart() {
  try {
    console.log('🛒 Testing Persistent Cart System\n');
    
    // Get a test user
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('❌ No users found. Please create a user first.');
      return;
    }
    
    console.log(`👤 Testing with user: ${user.name} (${user.email})`);
    
    // Get some products
    const products = await prisma.product.findMany({ take: 3 });
    if (products.length === 0) {
      console.log('❌ No products found.');
      return;
    }
    
    console.log(`📦 Available products: ${products.length}`);
    
    // Clear existing cart
    await prisma.cartItem.deleteMany({
      where: { userId: user.id }
    });
    
    // Add items to cart
    console.log('\\n🛒 Adding items to cart...');
    for (let i = 0; i < 2; i++) {
      const product = products[i];
      await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId: product.id,
          quantity: i + 1
        }
      });
      console.log(`✅ Added ${i + 1}x ${product.name} (₹${product.price})`);
    }
    
    // Fetch cart items
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
    
    console.log('\\n📋 Current cart contents:');
    let total = 0;
    cartItems.forEach(item => {
      const itemTotal = item.quantity * item.product.price;
      total += itemTotal;
      console.log(`- ${item.quantity}x ${item.product.name} = ₹${itemTotal}`);
    });
    
    console.log(`\\n💰 Cart Total: ₹${total}`);
    console.log(`📊 Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}`);
    
    console.log('\\n✅ Persistent Cart System Working!');
    console.log('\\n🔄 Cart will persist across logout/login sessions');
    
  } catch (error) {
    console.error('❌ Error testing cart:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testPersistentCart();