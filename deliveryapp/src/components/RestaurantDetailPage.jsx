import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { restaurants } from '../assets/restaurants';
import RestaurantDetail from '../components/RestaurantDetail';
import { CartContext } from '../context/CartContext';

/*
  Page wrapper: looks up restaurant by id and passes to the component.
  Allows adding to cart via CartContext.dispatch
*/
const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  const restaurant = restaurants.find(r => String(r.id) === id);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    navigate('/cart');
  };

  if (!restaurant) return <p>Restaurant not found</p>;

  return <RestaurantDetail restaurant={restaurant} onAddToCart={handleAddToCart} />;
};

export default RestaurantDetailPage;
