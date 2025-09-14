import { ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()
  const totalItems = useCartStore(state => state.getTotalItems())
  const router = useRouter()
  const switchLocale = (locale: string) => {
    if (router.locale === locale) return
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="absolute top-4 left-4 text-2xl font-bold text-gray-900 z-10">
                Velora
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                {(['en','hi','mr'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    aria-current={router.locale === l}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors border ${router.locale === l ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    {l === 'en' ? 'EN' : l === 'hi' ? 'हिं' : 'म्रा'}
                  </button>
                ))}
              </div>
              <Link href="/cart" className="relative p-2">
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {session ? (
                <div className="flex items-center space-x-4">
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                      Admin
                    </Link>
                  )}
                  <span className="text-gray-700">Hi, {session.user.name || session.user.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin" className="text-gray-700 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
