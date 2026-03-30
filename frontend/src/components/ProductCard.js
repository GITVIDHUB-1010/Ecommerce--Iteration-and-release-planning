import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < full || (i === full && half) ? '#f59e0b' : '#ddd' }}>★</span>
      ))}
    </span>
  );
};

const formatReviews = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

const ProductCard = ({ product, onToast, style }) => {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const [adding, setAdding] = useState(false);
  const inCart = cart.some(i => i.id === product.id);
  const cartItem = cart.find(i => i.id === product.id);

  const handleAdd = async (e) => {
    e.stopPropagation();
    setAdding(true);
    setTimeout(() => setAdding(false), 500);
    dispatch({ type: 'ADD_ITEM', payload: product });
    onToast && onToast(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const badgeColor = {
    'Bestseller': 'badge-warning',
    'New': 'badge-info',
    'Hot Deal': 'badge-danger',
    'Trending': 'badge-accent',
  };

  return (
    <div className="product-card" style={style} onClick={handleCardClick}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        {product.badge && (
          <span className={`badge ${badgeColor[product.badge] || 'badge-neutral'} product-badge`}>
            {product.badge}
          </span>
        )}
        <button className={`quick-add ${adding ? 'adding' : ''} ${inCart ? 'in-cart' : ''}`} onClick={handleAdd}>
          {adding ? '✓' : inCart ? `In Cart (${cartItem?.quantity})` : '+ Add to Cart'}
        </button>
      </div>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-val">{product.rating}</span>
          <span className="rating-count">({formatReviews(product.reviews)})</span>
        </div>
        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="product-stock">{product.stock <= 5 ? `Only ${product.stock} left!` : 'In stock'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
