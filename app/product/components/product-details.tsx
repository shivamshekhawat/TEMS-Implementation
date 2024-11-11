'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

type Variant = {
  name: string
  options: string[]
}

type Product = {
  id: string
  name: string
  description: string
  price: number
  variants: Variant[]
}

export function ProductDetails({ product }: { product: Product }) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) || value < 1 ? 1 : value)
  }

  const handleAddToCart = () => {
    // This would typically dispatch an action to add the item to the cart
    console.log('Adding to cart:', {
      product,
      variants: selectedVariants,
      quantity,
    })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-gray-600">{product.description}</p>
      {product.variants.map((variant) => (
        <div key={variant.name}>
          <label htmlFor={variant.name} className="block text-sm font-medium text-gray-700">
            {variant.name}
          </label>
          <Select
            id={variant.name}
            value={selectedVariants[variant.name] || ''}
            onValueChange={(value) => handleVariantChange(variant.name, value)}
          >
            <Select.Trigger className="w-full">
              <Select.Value placeholder={`Select ${variant.name}`} />
            </Select.Trigger>
            <Select.Content>
              {variant.options.map((option) => (
                <Select.Item key={option} value={option}>
                  {option}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
      ))}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-24"
        />
      </div>
      <Button onClick={handleAddToCart} className="w-full">
        Add to Cart
      </Button>
    </div>
  )
}