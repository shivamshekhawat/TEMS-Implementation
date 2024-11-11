'use client'

import { useRouter } from 'next/navigation'

export default function CategoryFilter({ categories, initialCategory = 'All' }) {
  const router = useRouter()

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/products?category=${encodeURIComponent(e.target.value)}`)
  }

  return (
    <select
      value={initialCategory}
      onChange={handleCategoryChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}