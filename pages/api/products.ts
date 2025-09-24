import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query
  
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        where: category ? { category: category as string } : {},
        orderBy: { createdAt: 'desc' }
      })
      
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}