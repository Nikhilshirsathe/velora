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

    await prisma.cartItem.deleteMany({
      where: { userId: user.userId }
    })

    res.status(200).json({ message: 'Cart cleared' })
  } catch (error) {
    console.error('Error clearing cart:', error)
    res.status(500).json({ message: 'Error clearing cart' })
  }
}