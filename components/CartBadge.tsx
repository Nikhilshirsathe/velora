import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store'

export default function CartBadge() {
  const [mounted, setMounted] = useState(false)
  const getTotalItems = useCartStore(state => state.getTotalItems)
  const items = useCartStore(state => state.items)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalItems = getTotalItems()
  
  if (totalItems === 0) return null

  return (
    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {totalItems}
    </span>
  )
}