import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { orderId, paymentId } = req.body

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          updatedAt: new Date()
        }
      })
      
      // Clear user's cart after successful order
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      
      if (user) {
        await prisma.cartItem.deleteMany({
          where: { userId: user.id }
        })
      }
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error completing order:', error)
    res.status(500).json({ message: 'Error completing order' })
  }
}