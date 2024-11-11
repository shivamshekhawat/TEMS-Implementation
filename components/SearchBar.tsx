'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar({ initialSearch = '' }) {
  const [search, setSearch] = useState(initialSearch)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/products?search=${encodeURIComponent(search)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  )
}