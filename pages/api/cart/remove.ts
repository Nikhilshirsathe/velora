import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

function getUserFromToken(req: NextApiRequest) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  
  try {
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    return decoded
  } catch {
    return null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const user = getUserFromToken(req)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { productId } = req.body

    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: user.userId,
          productId: productId
        }
      }
    })

    res.status(200).json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Error removing from cart:', error)
    res.status(500).json({ message: 'Error removing from cart' })
  }
}