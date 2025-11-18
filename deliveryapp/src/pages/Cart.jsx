import { useContext } from 'react';
import CartItem from '../components/CartItem';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={(id, qty) => updateQty(id, qty)} />
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
            <p>Delivery Fee: $5.00</p>
            <h4>Total: ${(calculateTotal() + 5).toFixed(2)}</h4>
            <button className="checkout-button" onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;