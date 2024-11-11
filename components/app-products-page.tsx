'use client'

import { Suspense } from 'react'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import PriceRangeFilter from '../components/PriceRangeFilter'
import Pagination from '../components/Pagination'

// Dummy data for demonstration
const products = [
  { id: 1, name: 'Product 1', category: 'Electronics', price: 99.99 },
  { id: 2, name: 'Product 2', category: 'Clothing', price: 49.99 },
  { id: 3, name: 'Product 3', category: 'Home', price: 79.99 },
  // Add more products...
]

const categories = ['All', 'Electronics', 'Clothing', 'Home']

export function BlockPage({
  searchParams = {}, // Ensure searchParams is defined to avoid undefined errors
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''
  const category = typeof searchParams.category === 'string' ? searchParams.category : 'All'
  const minPrice = typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : 0
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : Infinity
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1

  // Filter products based on search criteria
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || product.category === category) &&
    product.price >= minPrice &&
    product.price <= maxPrice
  )

  // Pagination setup
  const itemsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-3/4">
          {/* Make sure SearchBar accepts and handles initialSearch prop */}
          <SearchBar initialSearch={search} />
        </div>
        <div className="w-full md:w-1/4 space-y-4">
          {/* Make sure CategoryFilter and PriceRangeFilter handle props correctly */}
          <CategoryFilter categories={categories} initialCategory={category} />
          <PriceRangeFilter initialMinPrice={minPrice} initialMaxPrice={maxPrice} />
        </div>
      </div>
      <Suspense fallback={<div>Loading products...</div>}>
        {/* Ensure ProductGrid can handle empty product lists and renders without errors */}
        <ProductGrid products={paginatedProducts} />
      </Suspense>
      {/* Make sure Pagination component can handle currentPage and totalPages props correctly */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}

export default BlockPage
