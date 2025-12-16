import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const product = location.state?.product;

  useEffect(() => {
    if (!token || !user) {
      alert('Please login to place order');
      navigate('/user-login');
    }
  }, [token, user, navigate]);

  const [formData, setFormData] = useState({
    fullName: '',
    street: '',
    city: '',
    pincode: '',
    mobile: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Token:', token);
    console.log('User:', user);
    
    if (!token) {
      alert('Please login to place order');
      navigate('/user-login');
      return;
    }
    
    try {
      console.log('Sending request with token:', token.substring(0, 20) + '...');
      const response = await axios.post('http://localhost:5000/api/orders', {
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image
        },
        deliveryAddress: formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', response.data);
      
      if (response.data.success) {
        navigate(`/track-order/${response.data.orderId}`);
      }
    } catch (error) {
      console.error('Order error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error placing order';
      alert(`Error: ${errorMsg}`);
    }
  };

  if (!product) {
    navigate('/products');
    return null;
  }

  if (!token || !user) {
    return null;
  }

  return (
    <div className="place-order-page">
      <div className="container">
        <div className="order-container">
          <div className="product-summary card">
            <h2>Order Summary</h2>
            <img src={product.image} alt={product.title} className="summary-image" />
            <h3>{product.title}</h3>
            <p className="summary-price">${product.price}</p>
          </div>

          <div className="delivery-form card">
            <h2>Delivery Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
