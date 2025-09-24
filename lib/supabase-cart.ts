import { supabase } from './supabase'

export async function saveCartToSupabase(userEmail: string, items: any[]) {
  try {
    // Delete existing cart items for user
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_email', userEmail)

    // Insert new cart items
    if (items.length > 0) {
      const cartData = items.map(item => ({
        user_email: userEmail,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        product_image: item.image,
        quantity: item.quantity
      }))

      await supabase
        .from('cart_items')
        .insert(cartData)
    }

    return { success: true }
  } catch (error) {
    console.error('Error saving cart to Supabase:', error)
    return { success: false }
  }
}

export async function loadCartFromSupabase(userEmail: string) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_email', userEmail)

    if (error) throw error

    return data?.map(item => ({
      id: item.product_id,
      name: item.product_name,
      price: item.product_price,
      image: item.product_image,
      quantity: item.quantity
    })) || []
  } catch (error) {
    console.error('Error loading cart from Supabase:', error)
    return []
  }
}

export async function saveOrderToSupabase(userEmail: string, orderData: any) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_email: userEmail,
        total: orderData.total,
        items: JSON.stringify(orderData.items),
        address: JSON.stringify(orderData.address),
        status: 'COMPLETED',
        created_at: new Date().toISOString()
      })
      .select()

    if (error) throw error
    return { success: true, order: data[0] }
  } catch (error) {
    console.error('Error saving order to Supabase:', error)
    return { success: false }
  }
}

export async function loadOrdersFromSupabase(userEmail: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data?.map(order => ({
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.created_at,
      items: JSON.parse(order.items || '[]'),
      address: JSON.parse(order.address || '{}')
    })) || []
  } catch (error) {
    console.error('Error loading orders from Supabase:', error)
    return []
  }
}