import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  stock: number
}

const products: Product[] = [
  {
    id: '1',
    name: 'Joint Care Tablets',
    description: 'Herbal tablets with Guggul, Shallaki, Rasna, Ashwagandha, Hadjod & Zinc for joint and bone health.',
    price: 500,
    image: 'https://i.ibb.co/RppTq3h5/Whats-App-Image-2025-09-14-at-6-02-01-PM.jpg',
    category: 'healthcare',
    stock: 30
  },
  {
    id: '2',
    name: 'Immunity Booster Syrup',
    description: 'Natural immunity booster with herbs and vitamins.',
    price: 350,
    image: '/placeholder.jpg',
    category: 'healthcare',
    stock: 25
  },
  {
    id: '3',
    name: 'Cough Relief Syrup',
    description: 'Herbal cough syrup for natural relief.',
    price: 280,
    image: '/placeholder.jpg',
    category: 'healthcare',
    stock: 40
  },
  {
    id: '4',
    name: 'Digestive Tablets',
    description: 'Natural digestive aid with herbs.',
    price: 320,
    image: '/placeholder.jpg',
    category: 'healthcare',
    stock: 35
  },
  {
    id: '5',
    name: 'Heart Care Capsules',
    description: 'Herbal capsules for heart health.',
    price: 450,
    image: '/placeholder.jpg',
    category: 'healthcare',
    stock: 20
  },
  {
    id: '6',
    name: 'Liver Detox Syrup',
    description: 'Natural liver detox formula.',
    price: 380,
    image: '/placeholder.jpg',
    category: 'healthcare',
    stock: 28
  }
]

export default function Healthcare() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Products</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
