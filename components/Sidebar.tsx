import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const CartBadge = dynamic(() => import('./CartBadge'), { ssr: false })

function HealthcareProductsList() {
  const [products, setProducts] = useState<any[]>([])
  
  useEffect(() => {
    fetch('/api/products/healthcare')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
  }, [])
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">🏥 Healthcare Products</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {products.map(product => (
          <div key={product.id} className="text-xs text-gray-600 p-2 bg-white rounded-lg">
            <div className="font-medium">{product.name}</div>
            <div className="text-green-600">₹{product.price} - {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-xs text-gray-500 p-2">Loading products...</div>
        )}
      </div>
    </div>
  )
}

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'All Products', href: '/products', icon: ShoppingBagIcon },
  { name: 'Cart', href: '/cart', icon: ShoppingCartIcon },
  { name: 'Orders', href: '/orders', icon: ClipboardDocumentListIcon },
]



export default function Sidebar() {
  const router = useRouter()

  return (
    <div className="w-72 bg-white shadow-xl min-h-full border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Navigation Section */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <SparklesIcon className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Browse</h2>
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                      isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                    {item.name}
                    {item.name === 'Cart' && <CartBadge />}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Healthcare Products Section */}
          {router.pathname === '/products/healthcare' && <HealthcareProductsList />}


        </div>

        {/* Support Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Available 24/7 for assistance</p>
            <div className="flex">
              <a 
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chinmay.ghag6909@gmail.com&su=Need%20Help%20-%20Velora&body=Hi,%20I%20need%20help%20with:"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-center block"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}