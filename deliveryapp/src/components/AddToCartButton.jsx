import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

const AddToCartButton = ({ item }) => {
  const { cart, dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      toast.info('Item already in cart');
      return;
    }
    
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: item 
    });
  };

  const isInCart = cart.some(cartItem => cartItem.id === item.id);

  return (
    <button
      onClick={handleAddToCart}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
        ${isInCart 
          ? 'bg-gray-200 text-gray-600' 
          : 'bg-primary text-white hover:bg-primary/90'
        } transition-colors`}
      disabled={isInCart}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        {isInCart ? (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        )}
      </svg>
      {isInCart ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;