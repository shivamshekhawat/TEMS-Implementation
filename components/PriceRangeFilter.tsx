'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PriceRangeFilter({ initialMinPrice = 0, initialMaxPrice = Infinity }) {
  const [minPrice, setMinPrice] = useState(initialMinPrice)
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice === Infinity ? '' : initialMaxPrice)
  const router = useRouter()

  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/products?minPrice=${minPrice}&maxPrice=${maxPrice || ''}`)
  }

  return (
    <form onSubmit={handlePriceFilter} className="space-y-2">
      <div>
        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filter
      </button>
    </form>
  )
}