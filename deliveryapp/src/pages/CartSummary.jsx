const CartSummary = ({ subtotal, deliveryFee = 5, taxRate = 0.1 }) => {
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2 font-semibold text-black text-lg flex justify-between">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;