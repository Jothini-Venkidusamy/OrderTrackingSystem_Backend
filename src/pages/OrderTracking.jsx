import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import OrderTimeline from '../components/OrderTimeline';
import './OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setOrder(response.data.order);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId, token]);

  if (!order) return <div className="loading">Loading...</div>;

  return (
    <div className="tracking-page">
      <div className="container">
        <div className="tracking-card card">
          <h1>Track Your Order</h1>
          
          <div className="order-header">
            <div className="order-id">
              <span className="label">Order ID:</span>
              <span className="value">{order.orderId}</span>
            </div>
            <div className="order-status">
              <span className="status-badge">{order.status}</span>
            </div>
          </div>

          <OrderTimeline currentStatus={order.status} />

          <div className="order-details">
            <div className="detail-section">
              <h3>Product Details</h3>
              <div className="product-info">
                <img src={order.product.image} alt={order.product.title} />
                <div>
                  <p className="product-name">{order.product.title}</p>
                  <p className="product-price">${order.product.price}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Delivery Address</h3>
              <p>{order.deliveryAddress.fullName}</p>
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city} - {order.deliveryAddress.pincode}</p>
              <p>📞 {order.deliveryAddress.mobile}</p>
            </div>

            <div className="detail-section">
              <h3>Expected Delivery</h3>
              <p className="delivery-date">
                {new Date(order.expectedDelivery).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
