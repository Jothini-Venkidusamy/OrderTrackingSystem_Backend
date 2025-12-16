import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        const filtered = data.orders.filter(order => order.userId?._id === userId);
        setUserOrders(filtered);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserOrders(user._id);
  };

  const handleTrackingClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const updateOrderStatus = async (status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${selectedOrder.orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      fetchUserOrders(selectedUser._id);
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage users and their orders</p>
        </div>

        <div className="dashboard-content">
          <div className="users-panel">
            <h2>Users</h2>
            <div className="users-list">
              {users.map(user => (
                <div
                  key={user._id}
                  className={`user-item ${selectedUser?._id === user._id ? 'active' : ''}`}
                  onClick={() => handleUserClick(user)}
                >
                  <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div className="user-details">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="orders-panel">
            {selectedUser ? (
              <>
                <h2>{selectedUser.name}'s Orders</h2>
                {userOrders.length === 0 ? (
                  <p className="no-data">No orders yet</p>
                ) : (
                  <div className="orders-list">
                    {userOrders.map(order => (
                      <div key={order._id} className="order-item">
                        <img src={order.product.image} alt={order.product.title} />
                        <div className="order-details">
                          <h3>{order.product.title}</h3>
                          <p className="order-id">ID: {order.orderId}</p>
                          <p className="order-price">${order.product.price}</p>
                        </div>
                        <div className="order-actions">
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                          <button
                            className="btn-track"
                            onClick={() => handleTrackingClick(order)}
                          >
                            Update Tracking
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="no-selection">
                <p>Select a user to view their orders</p>
              </div>
            )}
          </div>
        </div>

        {showModal && selectedOrder && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Update Order Status</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="order-summary">
                  <img src={selectedOrder.product.image} alt={selectedOrder.product.title} />
                  <div>
                    <h3>{selectedOrder.product.title}</h3>
                    <p>Order ID: {selectedOrder.orderId}</p>
                    <p className="current-status">Current: <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
                  </div>
                </div>
                <div className="status-options">
                  <button
                    className={`status-btn ordered ${selectedOrder.status === 'Ordered' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus('Ordered')}
                  >
                    Ordered
                  </button>
                  <button
                    className={`status-btn packed ${selectedOrder.status === 'Packed' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus('Packed')}
                  >
                    Packed
                  </button>
                  <button
                    className={`status-btn shipped ${selectedOrder.status === 'Shipped' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus('Shipped')}
                  >
                    Shipped
                  </button>
                  <button
                    className={`status-btn delivered ${selectedOrder.status === 'Delivered' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus('Delivered')}
                  >
                    Delivered
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
