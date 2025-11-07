import { restaurants } from '../assets/restaurants';
import RestaurantCard from '../components/RestaurantCard';
// import '../styles/Home.css';

const Home = () => {
  const featured = restaurants.slice(0, 6);

  return (
    <div className="home">
      <section className="hero">
        <h1>Food Delivery</h1>
        <p>Order food from your favorite restaurants</p>
      </section>

      <h2>Featured</h2>
      <section className="restaurants-grid">
        {featured.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
      </section>
    </div>
  );
};

export default Home;