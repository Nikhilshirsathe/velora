import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'

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

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product out of stock')
      return
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success('Added to cart!')
  }

  const rating = 4.2 + Math.random() * 0.8 // Random rating between 4.2-5.0
  const reviews = Math.floor(Math.random() * 5000) + 100 // Random reviews 100-5100
  const discount = Math.floor(Math.random() * 30) + 10 // Random discount 10-40%
  const originalPrice = Math.round(product.price / (1 - discount / 100))

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
        {discount > 15 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 cursor-pointer">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            {reviews.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          {discount > 15 && (
            <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
          )}
        </div>

        <div className="text-xs text-gray-600">
          <p>FREE delivery <span className="font-semibold">Tomorrow</span></p>
          <p className="text-green-700">In stock ({product.stock} available)</p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium py-2 px-4 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}