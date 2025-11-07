import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button 
          onClick={() => onRemove(item.id)}
          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty = (id, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious items to your cart</p>
        <Link 
          to="/restaurants"
          className="bg-primary text-white px-6 py-3 rounded-full font-medium
            hover:bg-primary/90 transition-colors inline-block"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {cart.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={removeItem}
            onUpdateQuantity={updateQty}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>$5.00</span>
          </div>
          <div className="border-t pt-2 mt-2 font-semibold text-black text-lg flex justify-between">
            <span>Total</span>
            <span>${(calculateTotal() + 5).toFixed(2)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="w-full bg-primary text-white py-3 rounded-full font-medium
            hover:bg-primary/90 transition-colors text-center block mt-6"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;