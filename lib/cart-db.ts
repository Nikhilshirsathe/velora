import { prisma } from './prisma'

export async function saveCartToDb(userEmail: string, items: any[]) {
  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } })
    if (!user) return

    // Clear existing cart
    await prisma.cartItem.deleteMany({ where: { userId: user.id } })

    // Add new items
    for (const item of items) {
      await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId: item.id,
          quantity: item.quantity
        }
      })
    }
  } catch (error) {
    console.error('Save cart error:', error)
  }
}

export async function loadCartFromDb(userEmail: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } })
    if (!user) return []

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true }
    })

    return cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }))
  } catch (error) {
    console.error('Load cart error:', error)
    return []
  }
}