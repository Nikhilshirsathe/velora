import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' })
    }
  } else if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { name, description, price, image, category, stock, packSize } = req.body

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' })
    }

    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: typeof price === 'string' ? parseFloat(price) : price,
          image,
          category,
          stock: typeof stock === 'string' ? parseInt(stock) : (stock ?? 0),
          packSize,
        }
      })
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
