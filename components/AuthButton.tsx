import { useAuthContext } from './AuthProvider'
import { signOut } from '../lib/supabase-auth'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function AuthButton() {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error('Error signing out')
    } else {
      toast.success('Signed out successfully')
      router.push('/')
    }
  }

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          {user.user_metadata?.name || user.email}
        </span>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => router.push('/auth/signin')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign In
      </button>
      <button
        onClick={() => router.push('/auth/signup')}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Sign Up
      </button>
    </div>
  )
}