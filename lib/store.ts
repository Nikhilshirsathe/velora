import { create } from 'zustand'
import { saveCartToSupabase, loadCartFromSupabase } from './supabase-cart'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  userEmail: string | null
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  loadCart: (email: string) => Promise<void>
  saveCart: () => Promise<void>
  setUser: (email: string | null) => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  userEmail: null,
  
  setUser: (email) => {
    set({ userEmail: email })
    if (email) {
      get().loadCart(email)
    } else {
      set({ items: [] })
    }
  },
  
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(i => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return { items: [...state.items, { ...item, quantity: 1 }] }
    })
    get().saveCart()
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }))
    get().saveCart()
  },
  
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: quantity <= 0 
        ? state.items.filter(item => item.id !== id)
        : state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    }))
    get().saveCart()
  },
  
  clearCart: () => {
    set({ items: [] })
    get().saveCart()
  },
  
  loadCart: async (email) => {
    try {
      const items = await loadCartFromSupabase(email)
      set({ items })
    } catch (error) {
      console.log('Failed to load cart from Supabase:', error)
    }
  },
  
  saveCart: async () => {
    try {
      const { userEmail, items } = get()
      if (userEmail) {
        await saveCartToSupabase(userEmail, items)
      }
    } catch (error) {
      console.log('Failed to save cart to Supabase:', error)
    }
  },
  
  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  
  getTotalItems: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.quantity, 0)
  }
}))