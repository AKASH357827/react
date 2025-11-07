import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link 
      to={`/restaurant/${restaurant.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative h-48">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
          ⭐ {restaurant.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{restaurant.deliveryTime} mins</span>
          <span className="text-primary font-medium">View Menu →</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;