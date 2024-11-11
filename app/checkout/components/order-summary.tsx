export function OrderSummary() {
    // This would typically come from your cart state or API
    const orderItems = [
      { id: 1, name: 'T-Shirt', quantity: 2, price: 25.99 },
      { id: 2, name: 'Jeans', quantity: 1, price: 59.99 },
    ]
  
    const subtotal = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal + tax
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }