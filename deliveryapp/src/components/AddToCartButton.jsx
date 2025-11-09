import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

const AddToCartButton = ({ item }) => {
  const { cart, dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    const existingItem = cart.find(ci => ci.id === item.id);

    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });

    if (existingItem) {
      toast.success('Increased item quantity');
    } else {
      toast.success('Added to cart!');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="add-to-cart-btn inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
        bg-black text-white hover:bg-gray-800 transition-colors visible opacity-100"
      type="button"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2 visible"  
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
        />
      </svg>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;