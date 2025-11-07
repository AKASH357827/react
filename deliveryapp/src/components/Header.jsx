import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:scale-105 transition-transform duration-200"
          >
            FoodDelivery
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary px-4 py-2 text-sm font-medium 
                rounded-full transition-all duration-200 hover:bg-primary/5"
            >
              Home
            </Link>
            <Link 
              to="/restaurants" 
              className="text-gray-700 hover:text-primary px-4 py-2 text-sm font-medium 
                rounded-full transition-all duration-200 hover:bg-primary/5"
            >
              Restaurants
            </Link>
            {user && (
              <Link 
                to="/orders" 
                className="text-gray-700 hover:text-primary px-4 py-2 text-sm font-medium 
                  rounded-full transition-all duration-200 hover:bg-primary/5"
              >
                My Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-6">
            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors 
                group flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs 
                  font-bold rounded-full h-5 w-5 flex items-center justify-center 
                  transform transition-transform group-hover:scale-110">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                {/* User Menu */}
                <button 
                  className="flex items-center space-x-2 focus:outline-none p-2 rounded-full
                    hover:bg-gray-100 transition-all duration-200"
                  onClick={() => document.getElementById('userMenu').classList.toggle('hidden')}
                >
                  <img 
                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="h-8 w-8 rounded-full ring-2 ring-primary/20"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div 
                  id="userMenu"
                  className="hidden absolute right-0 w-48 mt-2 py-2 bg-white rounded-xl 
                    shadow-lg border border-gray-100 transform transition-all duration-200"
                >
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 
                      hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 
                      hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    Orders
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 
                      hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium 
                    hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 
                    hover:shadow-lg"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium 
                    hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 
                    hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;