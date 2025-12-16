import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=20')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleOrder = (product) => {
    navigate('/place-order', { state: { product } });
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Shop Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <button className="btn btn-primary" onClick={() => handleOrder(product)}>
                  Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
