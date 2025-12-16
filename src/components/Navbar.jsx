import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">📦 Order Tracker</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {user?.role === 'user' && (
            <>
              <Link to="/user-dashboard" className="nav-link">My Dashboard</Link>
              <Link to="/products" className="nav-link">Products</Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
          )}
          {user ? (
            <>
              <span className="nav-user">👤 {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/user-login" className="nav-link">User Login</Link>
              <Link to="/admin-login" className="nav-link">Admin Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
