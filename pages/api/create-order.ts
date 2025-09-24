import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/lib/prisma'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    const { amount, items, address } = req.body

    // Create database order
    let dbOrder = null
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      
      if (user) {
        console.log('Creating order for user:', user.id)
        console.log('Order items:', items)
        
        dbOrder = await prisma.order.create({
          data: {
            userId: user.id,
            total: amount / 100,
            status: 'PENDING',
            orderItems: {
              create: items.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
              }))
            }
          }
        })
        
        console.log('Order created:', dbOrder)
      }
    }

    // Create Razorpay order
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `order_${dbOrder?.id || Date.now()}`,
      notes: {
        orderId: dbOrder?.id || '',
        address: JSON.stringify(address)
      }
    }

    const razorpayOrder = await razorpay.orders.create(options)
    
    res.status(200).json({ ...razorpayOrder, dbOrderId: dbOrder?.id })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'Error creating order' })
  }
}