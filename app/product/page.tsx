import { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProductDetails } from './components/product-details'
import { RelatedProducts } from './components/related-products'
import { ProductReviews } from './components/product-reviews'

async function getProduct(id: string) {
  // This would be replaced with an actual API call
  const products = [
    {
      id: '1',
      name: 'Ergonomic Chair',
      description: 'A comfortable chair for long working hours',
      price: 299.99,
      images: ['/placeholder.svg?height=400&width=400'],
      variants: [
        { name: 'Color', options: ['Black', 'White', 'Gray'] },
        { name: 'Material', options: ['Leather', 'Fabric', 'Mesh'] },
      ],
      reviews: [
        { id: '1', rating: 5, comment: 'Great chair, very comfortable!', author: 'John Doe' },
        { id: '2', rating: 4, comment: 'Good quality, but a bit pricey', author: 'Jane Smith' },
      ],
    },
    // Add more products as needed
  ]
  
  const product = products.find(p => p.id === id)
  if (!product) return null
  return product
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <Suspense fallback={<div>Loading product details...</div>}>
          <ProductDetails product={product} />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading related products...</div>}>
        <RelatedProducts currentProductId={product.id} />
      </Suspense>
      <Suspense fallback={<div>Loading product reviews...</div>}>
        <ProductReviews reviews={product.reviews} />
      </Suspense>
    </div>
  )
}