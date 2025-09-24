import { ReactNode } from 'react'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
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
  const [supabaseUser, setSupabaseUser] = useState<any>(null)
  const totalItems = useCartStore(state => state.getTotalItems())
  const clearCart = useCartStore(state => state.clearCart)
  const { items, addItem } = useCartStore()
  const router = useRouter()
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user || null)
      if (session?.user) {
        useCartStore.getState().setUser(session.user.email || session.user.id)
      }
    })
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setSupabaseUser(session.user)
        // Load cart from Supabase for this user
        useCartStore.getState().setUser(session.user.email || session.user.id)
        // Orders will be loaded when orders page is visited
      } else if (event === 'SIGNED_OUT') {
        setSupabaseUser(null)
        useCartStore.getState().setUser(null)
        // Clear orders from view (they remain in localStorage)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('user-logout'))
        }
      }
    })
    
    return () => subscription.unsubscribe()
  }, [])
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
              <Link href="/" className="text-xl md:text-2xl font-bold text-gray-900">
                Velora
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
                {(['en','hi','mr'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    aria-current={router.locale === l}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${router.locale === l ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {l === 'en' ? 'EN' : l === 'hi' ? 'हिं' : 'म्रा'}
                  </button>
                ))}
              </div>
              <Link href="/cart" className="relative p-2 md:hidden">
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {supabaseUser ? (
                <div className="flex items-center space-x-2 md:space-x-4">
                  <span className="hidden md:inline text-green-600 text-sm font-medium">✓ Logged In</span>
                  <span className="hidden sm:inline text-gray-700 text-sm">Hi, {supabaseUser.user_metadata?.name || supabaseUser.email}</span>
                  <button
                    onClick={() => {
                      supabase.auth.signOut()
                      setSupabaseUser(null)
                    }}
                    className="bg-gray-200 hover:bg-gray-300 px-2 md:px-3 py-1 rounded text-xs md:text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="hidden md:inline text-red-600 text-sm">✗ Not Logged In</span>
                  <Link href="/auth/signin" className="text-gray-700 hover:text-gray-900 text-sm">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="bg-blue-600 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-blue-700 text-xs md:text-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <div className="fixed bottom-4 right-4 z-50">
          <a href="mailto:chinmay.ghag6909@gmail.com?subject=Need Help - Velora&body=Hi, I need help with:" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors block">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs">Products</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center p-2 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5" />
            </svg>
            <span className="text-xs">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/orders" className="flex flex-col items-center p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs">Orders</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
