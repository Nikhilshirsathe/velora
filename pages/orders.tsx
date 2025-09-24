import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  total: number
  status: string
  createdAt: string
  orderItems: {
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      price: number
      image: string
    }
  }[]
}

interface OrdersProps {
  orders?: Order[]
}

export default function Orders() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [supabaseUser, setSupabaseUser] = useState<any>(null)

  useEffect(() => {
    const loadOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseUser(session?.user || null)
      
      if (session?.user) {
        const { getOrdersFromSupabase } = await import('@/lib/supabase-orders')
        const { data: ordersData } = await getOrdersFromSupabase(session.user.id)
        
        // Transform data to match component format
        const transformedOrders = ordersData?.map((order: any) => ({
          id: order.id,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt,
          orderItems: order.orderItems
        })) || []
        
        setOrders(transformedOrders)
      } else {
        setOrders([])
      }
      setLoading(false)
    }
    
    // Handle logout event
    const handleLogout = () => {
      setOrders([])
      setSupabaseUser(null)
    }
    
    window.addEventListener('user-logout', handleLogout)
    loadOrders()
    
    return () => {
      window.removeEventListener('user-logout', handleLogout)
    }
  }, [])

  if (status === 'loading' || loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>
      
      {!supabaseUser ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Please login to view your orders.</p>
            <button 
              onClick={() => router.push('/auth/signin')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found.</p>
            <p className="text-gray-400 mt-2">Your order history will appear here once you make a purchase.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Order #{order.id.slice(-8)}</h3>
                    <div className="flex items-center text-gray-600">
                      <span className="text-sm">📅 {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      ₹{order.total.toFixed(2)}
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'COMPLETED' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'COMPLETED' ? '✓ ' : '🕒 '}{order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  📦 Items Ordered ({order.orderItems.length})
                </h4>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shadow-sm">
                        <Image
                          src={item.product.image || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 text-lg">{item.product.name}</h5>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-lg">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}

