import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const statuses = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];

const OrderStatus = ({ status }) => {
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

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = () => {
      // First try to get from localStorage
      const orderData = localStorage.getItem(`order_${id}`);
      if (orderData) {
        const parsedOrder = JSON.parse(orderData);
        setOrder(parsedOrder);
        
        // Simulate status updates
        if (parsedOrder.status !== 'Delivered') {
          const currentIndex = statuses.indexOf(parsedOrder.status);
          if (currentIndex < statuses.length - 1) {
            const nextStatus = statuses[currentIndex + 1];
            const updatedOrder = {
              ...parsedOrder,
              status: nextStatus
            };
            localStorage.setItem(`order_${id}`, JSON.stringify(updatedOrder));
            setOrder(updatedOrder);
            toast.info(`Order status updated to: ${nextStatus}`);
          }
        }
        setLoading(false);
      } else {
        setError('Order not found');
        setLoading(false);
      }
    };

    fetchOrder();
    // Update status every 10 seconds
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || 'Order not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Order #{order.id}</h2>
        
        <OrderStatus status={order.status} />
        
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Status</h3>
            <p className="text-gray-600">Current Status: 
              <span className="ml-2 font-medium text-black">{order.status}</span>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <div className="space-y-2 text-gray-600">
              <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>Total Amount: ${order.total.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
              <p>{order.address.street}</p>
              {order.address.apartment && <p>{order.address.apartment}</p>}
              <p>{order.address.city}, {order.address.zipCode}</p>
              <p>Phone: {order.address.phone}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            <div className="border rounded-lg divide-y">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between p-4">
                  <div>
                    <span className="font-medium">{item.quantity}x </span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;