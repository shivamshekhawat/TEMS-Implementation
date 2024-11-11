import Image from 'next/image'
import Link from 'next/link'

async function getRelatedProducts(currentProductId: string) {
  // This would be replaced with an actual API call
  const products = [
    { id: '2', name: 'Office Desk', price: 399.99, image: '/placeholder.svg?height=200&width=200' },
    { id: '3', name: 'Desk Lamp', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
    { id: '4', name: 'Filing Cabinet', price: 149.99, image: '/placeholder.svg?height=200&width=200' },
  ]
  return products.filter(p => p.id !== currentProductId)
}

export async function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const relatedProducts = await getRelatedProducts(currentProductId)

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <div className="relative aspect-square mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}