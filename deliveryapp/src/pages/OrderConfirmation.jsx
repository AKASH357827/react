import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = localStorage.getItem(`order_${id}`);
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
  }, [id]);

  if (!order) return <div>Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
        <p className="text-gray-600 mb-6">Your order has been confirmed</p>
        
        <div className="text-left border-t pt-6">
          <h3 className="font-semibold mb-4">Order Details</h3>
          <p className="text-gray-600">Order Number: #{order.id}</p>
          <p className="text-gray-600">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
          <p className="text-gray-600">Total Amount: ${order.total.toFixed(2)}</p>
        </div>

        <div className="mt-8 space-x-4">
          <Link 
            to={`/order/${order.id}`}
            className="inline-block bg-primary text-white px-6 py-2 rounded-full"
          >
            Track Order
          </Link>
          <Link 
            to="/"
            className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;