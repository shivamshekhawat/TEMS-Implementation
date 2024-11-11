

const products = [
  { id: 1, name: 'Product 1', category: 'Category A', price: 19.99 },
  { id: 2, name: 'Product 2', category: 'Category B', price: 29.99 },
  { id: 3, name: 'Product 3', category: 'Category C', price: 39.99 },
  { id: 4, name: 'Product 4', category: 'Category A', price: 49.99 },
]
export default function ProductGrid({ products }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-md p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.category}</p>
            <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    )
  }