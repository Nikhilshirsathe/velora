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
    console.log('Sync API - Session:', session?.user?.email)
    
    if (!session?.user?.email) {
      console.log('No session, skipping sync')
      return res.status(200).json({ success: true, message: 'Not logged in' })
    }

    const { items } = req.body
    console.log('Syncing items:', items)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Clear existing cart items
    await prisma.cartItem.deleteMany({
      where: { userId: user.id }
    })
    console.log('Cleared existing cart items')

    // Add new cart items
    if (items && items.length > 0) {
      for (const item of items) {
        await prisma.cartItem.create({
          data: {
            userId: user.id,
            productId: item.id,
            quantity: item.quantity
          }
        })
      }
      console.log('Added', items.length, 'items to database')
    }
    
    res.status(200).json({ success: true, message: 'Cart synced to database' })
  } catch (error) {
    console.error('Cart sync error:', error)
    res.status(500).json({ message: 'Sync failed' })
  }
}