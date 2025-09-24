// Simple localStorage fallback for orders
export const saveOrderToSupabase = async (order: any, userId: string) => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${userId}`) || '[]')
    existingOrders.unshift(order)
    localStorage.setItem(`orders_${userId}`, JSON.stringify(existingOrders))
    return { data: [order], error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const getOrdersFromSupabase = async (userId: string) => {
  try {
    const orders = JSON.parse(localStorage.getItem(`orders_${userId}`) || '[]')
    return { data: orders, error: null }
  } catch (error) {
    return { data: [], error }
  }
}