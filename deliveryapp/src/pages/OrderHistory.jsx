import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const OrderStatus = ({ status }) => {
  // Define the status flow
  const statuses = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];
  const currentIndex = statuses.indexOf(status);

  return (
    <div className="flex items-center gap-2 my-4">
      {statuses.map((s, i) => (
        <div key={s} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${i <= currentIndex ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {i <= currentIndex ? '✓' : (i + 1)}
          </div>
          {i < statuses.length - 1 && (
            <div 
              className={`h-1 w-12 ${i < currentIndex ? 'bg-black' : 'bg-gray-200'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const ReviewForm = ({ orderId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 p-4 rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
          rows="3"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [reviewingOrder, setReviewingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // fetch server orders
        const response = await fetch(`http://localhost:3000/orders?userId=${user.id}`);
        const serverOrders = response.ok ? await response.json() : [];

        // also include any locally saved fallback orders
        const localOrdersAll = JSON.parse(localStorage.getItem('local_orders') || '[]');
        const localOrdersForUser = localOrdersAll.filter(o => String(o.userId) === String(user.id));

        const combined = [...serverOrders, ...localOrdersForUser];
        setOrders(combined.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      } catch (err) {
        console.error('Error fetching orders:', err);
        // on error, still show local fallback orders if any
        const localOrdersAll = JSON.parse(localStorage.getItem('local_orders') || '[]');
        const localOrdersForUser = localOrdersAll.filter(o => String(o.userId) === String(user.id));
        setOrders(localOrdersForUser.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleSubmitReview = async (orderId, review) => {
    try {
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          review: {
            ...review,
            date: new Date().toISOString()
          }
        })
      });
      setOrders(orders.map(o => o.id === orderId ? { ...o, review } : o));
      setReviewingOrder(null);
      toast.success('Review submitted successfully!');
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      {!orders.length && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Link 
            to="/restaurants"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 inline-block"
          >
            Browse Restaurants
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {orders.map(order => (
          <div 
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.orderDate).toLocaleDateString()} at{' '}
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>

              <OrderStatus status={order.status} />

              {/* Order Items */}
              <div className="mt-4 space-y-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">Delivery Address:</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.zipCode}</p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <Link 
                  to={`/order/${order.id}`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200"
                >
                  Track Order
                </Link>
                {order.status === 'Delivered' && !order.review && (
                  <button
                    onClick={() => setReviewingOrder(order.id)}
                    className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90"
                  >
                    Add Review
                  </button>
                )}
              </div>

              {/* Review Form */}
              {reviewingOrder === order.id && (
                <ReviewForm
                  orderId={order.id}
                  onSubmit={(review) => handleSubmitReview(order.id, review)}
                  onCancel={() => setReviewingOrder(null)}
                />
              )}

              {/* Existing Review */}
              {order.review && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-yellow-400">
                      {'★'.repeat(order.review.rating)}
                      {'☆'.repeat(5 - order.review.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(order.review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{order.review.comment}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;