import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { restaurants } from '../assets/restaurants';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { dispatch } = useContext(CartContext);
  
  const restaurant = restaurants.find(r => String(r.id) === id);

  if (!restaurant) {
    return <div className="text-center py-10">Restaurant not found</div>;
  }

  const categories = ['all', ...new Set(restaurant.menu?.map(item => item.category))];
  const filteredMenu = selectedCategory === 'all' 
    ? restaurant.menu 
    : restaurant.menu?.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...item, restaurantId: restaurant.id } 
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Restaurant Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="relative h-[300px]">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">⭐ {restaurant.rating}</span>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.deliveryTime} mins</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600">{restaurant.description}</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto py-4 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              ${selectedCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Grid - use CSS grid from src/App.css (.menu-grid / .menu-card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu?.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium
                    hover:bg-primary/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
