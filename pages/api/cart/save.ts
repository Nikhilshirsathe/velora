import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { saveCartToDb } from '@/lib/cart-db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
      return res.status(200).json({ success: false })
    }

    const { items } = req.body
    await saveCartToDb(session.user.email, items)
    
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false })
  }
}