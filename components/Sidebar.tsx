import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon,
  HeartIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'All Products', href: '/products', icon: ShoppingBagIcon },
  { name: 'Healthcare', href: '/products/healthcare', icon: HeartIcon },
  { name: 'Personal Care', href: '/products/personal-care', icon: UserIcon },
  { name: 'Cart', href: '/cart', icon: ShoppingCartIcon },
  { name: 'Orders', href: '/orders', icon: ClipboardDocumentListIcon },
]

const supportOptions = [
  { name: 'Help Center', href: '/support/help', icon: QuestionMarkCircleIcon },
  { name: 'Live Chat', href: '/support/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Call Support', href: 'tel:+1-800-VELORA', icon: PhoneIcon },
  { name: 'Email Us', href: 'mailto:support@velora.com', icon: EnvelopeIcon },
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
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                      isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Featured Section */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">✨ Special Offers</h3>
            <p className="text-xs text-gray-600 mb-3">Get 20% off on your first order!</p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Claim Now
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
              Need Help?
            </h3>
            <div className="space-y-2">
              {supportOptions.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Contact */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Contact</h4>
            <p className="text-xs text-gray-600 mb-3">Available 24/7 for assistance</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">
                Chat Now
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 text-xs font-medium py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors">
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}