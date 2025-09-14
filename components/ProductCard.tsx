import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'
import { useT } from '@/lib/i18n'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  stock: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)
  const t = useT()

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error(t('outOfStock'))
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(t('addToCart'))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 p-4 group">
      <div className="relative mb-3">
        <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.image || 'https://via.placeholder.com/300x200'}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-700">{t('qty')}: {product.stock}</span>
        </div>

        <div className="pt-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium py-2 px-4 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock <= 0 ? t('outOfStock') : t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}
