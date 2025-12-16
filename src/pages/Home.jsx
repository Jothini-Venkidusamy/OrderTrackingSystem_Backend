import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">📦 Order Tracking System</h1>
        <p className="home-subtitle">Track your orders in real-time with ease</p>
        
        <div className="features">
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>Real-time Tracking</h3>
            <p>Monitor your order status instantly</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📍</span>
            <h3>Location Updates</h3>
            <p>Know exactly where your package is</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h3>Delivery Status</h3>
            <p>Get notified at every step</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📜</span>
            <h3>Order History</h3>
            <p>View all your past orders</p>
          </div>
        </div>

        {user ? (
          <button className="btn btn-primary" onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/user-dashboard')}>
            Go to Dashboard
          </button>
        ) : (
          <div className="home-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/user-login')}>
              User Login
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin-login')}>
              Admin Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
