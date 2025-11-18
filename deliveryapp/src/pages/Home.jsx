import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
          alt="Food Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <Link 
          to="/restaurants" 
          className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full
            hover:bg-white/20 transition-all duration-300"
        >
          Restaurants
        </Link>

        <Link 
          to="/orders" 
          className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full
            hover:bg-white/20 transition-all duration-300"
        >
          Orders
        </Link>

        <Link 
          to="/cart" 
          className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full
            hover:bg-white/20 transition-all duration-300 relative"
        >
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary w-6 h-6 
              rounded-full flex items-center justify-center text-white text-sm">
              {cart.length}
            </span>
          )}
        </Link>

        {user ? (
          <Link 
            to="/profile" 
            className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full
              hover:bg-white/20 transition-all duration-300"
          >
            Profile
          </Link>
        ) : (
          <Link 
            to="/signup" 
            className="px-6 py-2 bg-primary text-white rounded-full
              hover:bg-primary/90 transition-all duration-300"
          >
            Sign Up
          </Link>
        )}
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-center">
          <span className="block mb-2">Delicious Food</span>
          <span className="block text-primary">Delivered</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl text-center">
          Experience the finest restaurants and mouth-watering dishes 
          delivered fresh and hot
        </p>

        <Link
          to="/restaurants"
          className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold
            hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          Explore Restaurants →
        </Link>
      </div>
    </div>
  );
};

export default Home;