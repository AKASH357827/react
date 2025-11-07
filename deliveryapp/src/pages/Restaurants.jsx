import { useState } from 'react';
import { restaurants } from '../assets/restaurants';
import RestaurantCard from '../components/RestaurantCard';

const Restaurants = () => {
  const [sortBy, setSortBy] = useState('rating');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = restaurants
    .filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCuisine ? restaurant.cuisine === filterCuisine : true)
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'deliveryTime') return a.deliveryTime - b.deliveryTime;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters Section */}
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-full flex-grow md:flex-grow-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="rating">Rating</option>
          <option value="deliveryTime">Delivery Time</option>
        </select>
        <select
          value={filterCuisine}
          onChange={(e) => setFilterCuisine(e.target.value)}
          className="px-4 py-2 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>

      {/* Restaurants Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;