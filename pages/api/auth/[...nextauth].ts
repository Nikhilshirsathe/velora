import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })
          
          if (user && user.password === credentials.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  }
})