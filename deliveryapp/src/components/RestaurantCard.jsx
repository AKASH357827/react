import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link 
      to={`/restaurant/${restaurant.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
          ⭐ {restaurant.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-gray-500 text-sm">{restaurant.deliveryTime} mins</span>
          <span className="text-primary text-sm font-medium">View Menu →</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;