import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { loadCartFromDb } from '@/lib/cart-db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
      return res.status(200).json([])
    }

    const items = await loadCartFromDb(session.user.email)
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json([])
  }
}