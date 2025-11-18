import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    
    const prevBodyOverflow = document.body.style.overflow;
    const prevDocOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
    
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevDocOverflow || '';
    };
  }, []);

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