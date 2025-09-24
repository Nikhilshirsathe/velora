import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: { id: id as string }
      })
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product' })
    }
  } else if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { name, description, price, image, category, stock } = req.body

    try {
      const product = await prisma.product.update({
        where: { id: id as string },
        data: {
          name,
          description,
          price: parseFloat(price),
          image,
          category,
          stock: parseInt(stock),
        }
      })
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product' })
    }
  } else if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
      await prisma.product.delete({
        where: { id: id as string }
      })
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}