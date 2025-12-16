import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', formData);
      if (data.success) {
        login(data.user, data.token);
        navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/user-dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <h1>✨ Create Account</h1>
          <p>Join us today and start your journey</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
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
          <div className="role-selection">
            <p className="role-label">I am a:</p>
            <div className="role-options">
              <label className={`role-option ${formData.role === 'user' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
                <div className="role-card">
                  <span className="role-icon">🛍️</span>
                  <span className="role-name">User</span>
                  <span className="role-desc">Shop & Track Orders</span>
                </div>
              </label>
              <label className={`role-option ${formData.role === 'admin' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
                <div className="role-card">
                  <span className="role-icon">🔐</span>
                  <span className="role-name">Admin</span>
                  <span className="role-desc">Manage Orders</span>
                </div>
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-animated">
            <span>Create Account</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>
        <p className="auth-link">
          Already have an account? 
          <Link to="/user-login">User Login</Link> | 
          <Link to="/admin-login">Admin Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
