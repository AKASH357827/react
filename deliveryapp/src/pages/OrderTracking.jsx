import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const statuses = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];

// Add the OrderStatus component definition
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

  useEffect(() => {
    const fetchOrder = () => {
      const orderData = localStorage.getItem(`order_${id}`);
      if (orderData) {
        const parsedOrder = JSON.parse(orderData);
        setOrder(parsedOrder);

        // Simulate order progress
        const currentIndex = statuses.indexOf(parsedOrder.status);
        
        if (currentIndex < statuses.length - 1) {
          // Update status after random interval (between 5-15 seconds for demo)
          const delay = Math.random() * 10000 + 5000;
          setTimeout(() => {
            const updatedOrder = {
              ...parsedOrder,
              status: statuses[currentIndex + 1]
            };
            localStorage.setItem(`order_${id}`, JSON.stringify(updatedOrder));
            setOrder(updatedOrder);
          }, delay);
        }
      }
    };

    fetchOrder();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <div>Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order #{order.id}</h2>
      <OrderStatus status={order.status} />
      
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Order Details</h3>
        <div className="space-y-4">
          <p>Status: <span className="font-medium">{order.status}</span></p>
          <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
          <p>Total Amount: ${order.total.toFixed(2)}</p>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Items:</h4>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between py-2">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;