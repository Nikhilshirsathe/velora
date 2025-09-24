import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// Removed useSession to avoid SessionProvider dependency
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
  packSize?: string | null
  'description.en'?: string
  'description.hi'?: string
  'description.mr'?: string
  'name.en'?: string
  'name.hi'?: string
  'name.mr'?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)
  const t = useT()
  const { locale } = useRouter()
  
  // Get localized content based on current locale
  const getLocalizedDescription = () => {
    if (locale === 'hi' && product['description.hi']) return product['description.hi']
    if (locale === 'mr' && product['description.mr']) return product['description.mr']
    if (locale === 'en' && product['description.en']) return product['description.en']
    return product.description || ''
  }
  
  const getLocalizedName = () => {
    if (locale === 'hi' && product['name.hi']) return product['name.hi']
    if (locale === 'mr' && product['name.mr']) return product['name.mr']
    if (locale === 'en' && product['name.en']) return product['name.en']
    return product.name
  }
  
  const displayDescription = getLocalizedDescription()
  const displayName = getLocalizedName()

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
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: 'bottom-right',
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 p-1.5 sm:p-2 md:p-3 lg:p-4 group flex flex-col h-full">
      <div className="relative mb-3">
        <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 bg-gray-50 rounded-lg overflow-hidden">
          <Link href={`/products/${product.id}`} aria-label="View details" className="block relative h-full">
            <Image
              src={product.image || 'https://via.placeholder.com/300x200'}
              alt={product.name}
              fill
              sizes="300px"
              priority
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 line-clamp-2">{displayName}</h3>
        {displayDescription && (
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{displayDescription}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs text-gray-700 hidden sm:block">{t('qty')}: {product.packSize ?? `${product.stock}`}</span>
        </div>

        <div className="pt-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs sm:text-sm font-medium py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-4 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock <= 0 ? t('outOfStock') : t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}
