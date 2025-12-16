import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders();
  }, [token]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="container">
        <h1 className="page-title">My Dashboard</h1>
        
        <div className="dashboard-actions">
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Purchase Products
          </button>
        </div>

        <div className="my-orders card">
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p className="no-orders">No orders yet. Start shopping!</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-item">
                  <img src={order.product.image} alt={order.product.title} />
                  <div className="order-info">
                    <h3>{order.product.title}</h3>
                    <p className="order-id">Order ID: {order.orderId}</p>
                    <p className="order-price">${order.product.price}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                    <button 
                      className="btn-track"
                      onClick={() => navigate(`/track-order/${order.orderId}`)}
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
