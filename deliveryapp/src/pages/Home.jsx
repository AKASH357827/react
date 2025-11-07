import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Home = () => {
  // keep contexts imported so Header / nav behavior remains correct
  useContext(AuthContext);
  useContext(CartContext);

  return (
    <main className="home-hero" aria-label="Home">
      <img
        className="home-image"
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
        alt="Delicious food"
      />
    </main>
  );
};

export default Home;