import { GetServerSideProps } from 'next'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/prisma'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  stock: number
}

interface PersonalCareProps {
  products: Product[]
}

export default function PersonalCare({ products }: PersonalCareProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Care Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No personal care products found.</p>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await prisma.product.findMany({
      where: { category: 'personal-care' },
      orderBy: { createdAt: 'desc' }
    })

    return {
      props: {
        products: JSON.parse(JSON.stringify(products))
      }
    }
  } catch (error) {
    return {
      props: {
        products: []
      }
    }
  }
}