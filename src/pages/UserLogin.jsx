import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (data.success) {
        if (data.user.role !== 'user') {
          alert('Please use admin login page');
          return;
        }
        login(data.user, data.token);
        navigate('/user-dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <h1>🛍️ User Login</h1>
          <p>Welcome back! Login to continue shopping</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-animated">
            <span>Login</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="auth-link">
          Are you an admin? <Link to="/admin-login">Admin Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
