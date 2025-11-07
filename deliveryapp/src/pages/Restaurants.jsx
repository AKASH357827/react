import { useState } from 'react';
import { restaurants } from '../assets/restaurants'; // fixed path
import RestaurantCard from '../components/RestaurantCard';
// import '../styles/Restaurants.css';

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
    <div className="restaurants-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="rating">Rating</option>
          <option value="deliveryTime">Delivery Time</option>
        </select>
        <select value={filterCuisine} onChange={(e) => setFilterCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>

      <div className="restaurants-grid">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;