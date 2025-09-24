import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
      return res.status(200).json([])
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return res.status(200).json([])
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            stock: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json(cartItems)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Error fetching cart' })
  }
}