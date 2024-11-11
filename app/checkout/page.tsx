import { Suspense } from 'react'
import { CheckoutForm } from './components/checkout-form'
import { OrderSummary } from './components/order-summary'

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<div>Loading checkout form...</div>}>
            <CheckoutForm />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading order summary...</div>}>
            <OrderSummary />
          </Suspense>
        </div>
      </div>
    </div>
  )
}