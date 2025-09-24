import { useState } from 'react'
import { useCartStore } from '@/lib/store'

export default function TestLogin() {
  const [email, setEmail] = useState('nikhilshirsathe@gmail.com')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const setToken = useCartStore(state => state.setToken)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('cart-token', data.token)
        setToken(data.token)
        setMessage('✅ Login successful! Cart loaded.')
      } else {
        setMessage(`❌ ${data.message}`)
      }
    } catch (error) {
      setMessage('❌ Login failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cart-token')
    setToken(null)
    setMessage('✅ Logged out')
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Test Cart Login</h1>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      
      <button
        onClick={handleLogout}
        className="w-full mt-2 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
      >
        Logout
      </button>
      
      {message && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          {message}
        </div>
      )}
    </div>
  )
}