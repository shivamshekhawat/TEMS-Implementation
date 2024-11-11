'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key')

function CheckoutFormContent() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'An unknown error occurred')
      setIsProcessing(false)
      return
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (paymentError) {
      setError(paymentError.message ?? 'An unknown error occurred')
      setIsProcessing(false)
    } else {
      // Payment succeeded, redirect to order confirmation
      router.push('/order-confirmation')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" required />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="123 Main St, City, Country" required />
      </div>
      <PaymentElement />
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" disabled={isProcessing || !stripe} className="w-full">
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}

export function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Fetch the client secret from your server
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const options = {
    clientSecret,
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutFormContent />
        </Elements>
      )}
    </div>
  )
}