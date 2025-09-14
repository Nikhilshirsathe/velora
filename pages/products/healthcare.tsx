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

interface HealthcareProps {
  products: Product[]
}

export default function Healthcare({ products }: HealthcareProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Products</h1>
        <div className="bg-green-50 rounded-lg p-6 mb-6">
          <img 
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=200&fit=crop" 
            alt="Natural Healthcare Solutions" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold text-green-800 mb-2">🌿 Natural Healthcare Solutions</h2>
          <p className="text-green-700">Discover our range of natural and organic healthcare products for your wellness journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No healthcare products found.</p>
          <p className="text-gray-400 mt-2">Check back soon for natural healthcare solutions!</p>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await prisma.product.findMany({
      where: { category: 'healthcare' },
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