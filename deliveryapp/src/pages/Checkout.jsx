import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: Date.now(),
      items: cart,
      address: formData,
      status: 'Received', // Initial status
      total: cart.reduce((s, i) => s + i.price * i.quantity, 0) + 5,
      orderDate: new Date().toISOString(),
    };
    
    localStorage.setItem(`order_${order.id}`, JSON.stringify(order));
    dispatch({ type: 'CLEAR_CART' });
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
          <div className="grid gap-4">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="apartment"
              placeholder="Apt, Suite, etc. (optional)"
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleInputChange}
                id="card"
              />
              <label htmlFor="card">Credit/Debit Card</label>
            </div>
            
            {formData.paymentMethod === 'card' && (
              <div className="grid gap-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="cardCvv"
                    placeholder="CVV"
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleInputChange}
                id="cash"
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
          </div>
        </div>

        {/* Updated submit button with better visibility and positioning */}
        <div className="sticky bottom-4 z-50"> {/* Makes button stick to bottom */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full text-lg font-medium
              hover:bg-gray-800 transition-all duration-200 transform hover:scale-105
              shadow-lg relative z-50" // Added relative and z-50 for visibility
          >
            Place Order (${(cart.reduce((s, i) => s + i.price * i.quantity, 0) + 5).toFixed(2)})
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;