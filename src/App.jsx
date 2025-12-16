import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import Products from './pages/Products';
import PlaceOrder from './pages/PlaceOrder';
import OrderTracking from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/track-order/:orderId" element={<OrderTracking />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
