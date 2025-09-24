import { supabase } from './supabase'

export const signUp = async (email: string, password: string, name: string) => {
  try {
    // Validate inputs
    if (!email || !password || !name) {
      return { data: null, error: { message: 'All fields are required' } }
    }
    
    if (!email.includes('@')) {
      return { data: null, error: { message: 'Please enter a valid email address' } }
    }
    
    if (password.length < 6) {
      return { data: null, error: { message: 'Password must be at least 6 characters' } }
    }
    
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name.trim()
        }
      }
    })
    
    return { data, error }
  } catch (err) {
    console.error('Auth error:', err)
    return { data: null, error: { message: 'Network error. Please try again.' } }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    // Validate inputs
    if (!email || !password) {
      return { data: null, error: { message: 'Email and password are required' } }
    }
    
    if (!email.includes('@')) {
      return { data: null, error: { message: 'Please enter a valid email address' } }
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    })
    
    return { data, error }
  } catch (err) {
    console.error('Auth error:', err)
    return { data: null, error: { message: 'Network error. Please try again.' } }
  }
}