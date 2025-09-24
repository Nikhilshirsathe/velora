import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { EyeIcon, EyeSlashIcon, SparklesIcon, ShieldCheckIcon, UserIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { signUp } from '@/lib/supabase-auth'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500', text: 'Weak' }
    if (password.length < 8) return { strength: 'medium', color: 'bg-yellow-500', text: 'Medium' }
    return { strength: 'strong', color: 'bg-green-500', text: 'Strong' }
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signUp(formData.email, formData.password, formData.name)

      if (error) {
        toast.error(error.message || 'Something went wrong')
      } else {
        toast.success('Check your email to confirm your account! 📧', { duration: 4000 })
        router.push('/auth/signin')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Join Velora
          </h1>
          <p className="text-gray-600">Start your wellness journey with natural products</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Password strength:</span>
                    <span className={`font-medium ${
                      passwordStrength.strength === 'weak' ? 'text-red-600' :
                      passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${
                      passwordStrength.color
                    }`} style={{
                      width: passwordStrength.strength === 'weak' ? '33%' :
                             passwordStrength.strength === 'medium' ? '66%' : '100%'
                    }} />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 ${
                    formData.confirmPassword ? 
                      (passwordsMatch ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') :
                      'border-gray-200 focus:ring-purple-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                  {formData.confirmPassword && passwordsMatch && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading || !passwordsMatch}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/auth/signin" 
                className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-center font-semibold text-gray-900 mb-4">Why join Velora?</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <div className="text-green-500 mr-3">✓</div>
              <span>Access to premium natural products</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="text-green-500 mr-3">✓</div>
              <span>Exclusive member discounts</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="text-green-500 mr-3">✓</div>
              <span>Fast & secure delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}