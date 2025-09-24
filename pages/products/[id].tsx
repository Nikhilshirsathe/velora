import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { useCartStore } from '@/lib/store'
import { useRouter } from 'next/router'
import { useT } from '@/lib/i18n'

interface Translation { locale: string; name: string; description?: string | null }

interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  image?: string | null
  category: string
  stock: number
  packSize?: string | null
  translations: Translation[]
}

interface Props { product: Product | null }

export default function ProductDetails({ product }: Props) {
  const router = useRouter()
  const t = useT()
  const addItem = useCartStore(state => state.addItem)

  if (!product) return (
    <div className="max-w-3xl mx-auto p-6">
      <p className="text-gray-600">{t('noProducts')}</p>
      <Link href="/products" className="text-blue-600 hover:underline">← Back</Link>
    </div>
  )

  const l = (router.locale as 'en'|'hi'|'mr') || 'en'
  const tr = product.translations.find(x => x.locale === l)
  const name = tr?.name || product.name
  const description = tr?.description || product.description || ''

  const handleAdd = async () => {
    if (product.stock <= 0) return
    try {
      await addItem({ id: product.id, name: product.name, price: product.price, image: product.image || undefined })
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-72 md:h-96 bg-white border rounded-lg overflow-hidden">
          <Image 
            src={product.image || 'https://via.placeholder.com/600x400'} 
            alt={name} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            className="object-contain" 
          />
        </div>
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold">₹{product.price}</span>
            {product.packSize && <span className="text-gray-600">{product.packSize}</span>}
          </div>
          {description && (
            <p className="text-gray-700 whitespace-pre-line mb-6">{description}</p>
          )}

          <div className="flex items-center space-x-3">
            <button onClick={handleAdd} disabled={product.stock<=0} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-5 py-2 rounded-full disabled:bg-gray-300">
              {product.stock<=0 ? t('outOfStock') : t('addToCart')}
            </button>
            <Link href="/products" className="text-blue-600 hover:underline">← {t('allProducts')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string }
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { translations: true },
    })

    return { props: { product: JSON.parse(JSON.stringify(product)) } }
  } catch (e) {
    return { props: { product: null } }
  }
}
