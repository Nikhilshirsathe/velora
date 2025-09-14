import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600">Add some products to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <div className="relative w-16 h-16">
                <Image
                  src={item.image || 'https://via.placeholder.com/64x64'}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total: ₹{getTotalPrice().toFixed(2)}</span>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700"
            >
              Clear Cart
            </button>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}