import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to place an order');
      navigate('/login');
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    const addressObj = {
      street: formData.address,
      apartment: formData.apartment || '',
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || '',
      phone: formData.phone || ''
    };

    const order = {
      userId: String(user?.id), // ensure string so server queries match
      items: cart,
      address: addressObj,
      status: 'Received',
      total: cart.reduce((s, i) => s + i.price * i.quantity, 0) + 5,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded ${response.status}: ${text}`);
      }

      const savedOrder = await response.json();
      console.log('Order saved on server:', savedOrder);
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${savedOrder.id}`);
    } catch (err) {
      console.error('Error creating order:', err);
      toast.error('Could not reach server — saving order locally');

      // fallback: accumulate local fallback orders under 'local_orders'
      const fallbackId = `local_${Date.now()}`;
      const fallbackOrder = { ...order, id: fallbackId };
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      localOrders.push(fallbackOrder);
      localStorage.setItem('local_orders', JSON.stringify(localOrders));

      dispatch({ type: 'CLEAR_CART' });
      navigate(`/order-confirmation/${fallbackId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
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

        {/* Fixed button - no sticky, just good positioning */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-3 rounded-full text-lg font-medium
            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800 transition-all duration-200 transform hover:scale-105'}
            shadow-lg`}
        >
          {loading ? 'Placing order...' : `Place Order (${(cart.reduce((s, i) => s + i.price * i.quantity, 0) + 5).toFixed(2)})`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;