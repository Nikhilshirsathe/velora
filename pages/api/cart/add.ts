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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const user = getUserFromToken(req)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { productId, quantity = 1 } = req.body

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: user.userId,
          productId: productId
        }
      }
    })

    if (existingCartItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true
            }
          }
        }
      })
      return res.status(200).json(updatedItem)
    } else {
      const newItem = await prisma.cartItem.create({
        data: {
          userId: user.userId,
          productId: productId,
          quantity: quantity
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true
            }
          }
        }
      })
      return res.status(201).json(newItem)
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    res.status(500).json({ message: 'Error adding to cart' })
  }
}