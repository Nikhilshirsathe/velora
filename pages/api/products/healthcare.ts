import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        where: {
          category: 'healthcare'
        },
        include: {
          translations: true
        },
        orderBy: { createdAt: 'desc' }
      })
      
      const transformedProducts = products.map(product => {
        const result = { ...product }
        if (product.translations) {
          product.translations.forEach(t => {
            result[`description.${t.locale}`] = t.description
          })
        }
        delete result.translations
        return result
      })
      
      res.status(200).json(transformedProducts)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch healthcare products' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}