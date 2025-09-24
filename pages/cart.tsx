import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// Removed heroicons to avoid SVG errors

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handleCheckout = () => {
    setShowAddressForm(true)
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total * 100, // Use calculated total instead of getTotalPrice
          items: items,
          address: address
        })
      })
      
      const order = await response.json()
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Velora',
        description: 'Purchase from Velora',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Get current user from Supabase
            const { supabase } = await import('@/lib/supabase')
            const { saveOrderToSupabase } = await import('@/lib/supabase-orders')
            
            const { data: { session } } = await supabase.auth.getSession()
            
            if (session?.user) {
              // Create order object
              const newOrder = {
                id: Date.now().toString(),
                total: total,
                status: 'COMPLETED',
                createdAt: new Date().toISOString(),
                paymentId: response.razorpay_payment_id,
                address: address,
                orderItems: items.map(item => ({
                  id: Date.now().toString() + Math.random(),
                  quantity: item.quantity,
                  price: item.price,
                  product: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image || '/placeholder.jpg'
                  }
                }))
              }
              
              // Save order to Supabase
              await saveOrderToSupabase(newOrder, session.user.id)
            }
            
            alert('Payment successful! Order completed.')
            clearCart()
            setShowAddressForm(false)
            router.push('/orders')
          } catch (error) {
            console.error('Error completing order:', error)
          }
        },
        prefill: {
          name: address.name,
          email: 'customer@example.com',
          contact: address.phone
        },
        theme: {
          color: '#3B82F6'
        }
      }
      
      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        // Load Razorpay script dynamically
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => {
          const rzp = new window.Razorpay(options)
          rzp.open()
        }
        document.head.appendChild(script)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-6 flex items-center justify-center text-6xl">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Discover amazing products and add them to your cart!</p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image || 'https://via.placeholder.com/80x80'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">₹{item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 sm:p-6 bg-gray-50 border-t">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Checkout ₹${total.toFixed(2)}`}
              </button>
              
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">Secure payment by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      
      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delivery Address</h3>
              <p className="text-gray-600">Please provide your delivery details</p>
            </div>
            
            <form onSubmit={handleAddressSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={address.name}
                  onChange={(e) => setAddress({...address, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={address.phone}
                  onChange={(e) => setAddress({...address, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <textarea
                  placeholder="Enter your complete address"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={2}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({...address, pincode: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}