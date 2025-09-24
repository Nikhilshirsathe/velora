export default function Healthcare() {
  const products = [
    {
      id: '1',
      name: 'Joint Care Tablets',
      description: 'Herbal tablets for joint health',
      price: 500,
      stock: 30
    },
    {
      id: '2',
      name: 'Immunity Booster Syrup',
      description: 'Natural immunity booster',
      price: 350,
      stock: 25
    }
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h1>Healthcare Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>₹{product.price}</strong></p>
            <p>Stock: {product.stock}</p>
            <button 
              style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => alert(`Added ${product.name} to cart!`)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}