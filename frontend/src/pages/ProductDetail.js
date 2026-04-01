import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

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

const ProductDetail = ({ onToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const { data } = await axios.get(`${apiUrl}/api/products/${id}`);
        setProduct(data);
      } catch {
        onToast && onToast('Product not found', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, onToast]);

  const handleAddToCart = async () => {
    setAdding(true);
    setTimeout(() => setAdding(false), 500);
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    onToast && onToast(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = async () => {
    // Add items to cart
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    onToast && onToast(`${quantity} x ${product.name} added to cart!`);
    // Navigate to checkout
    setTimeout(() => navigate('/checkout'), 300);
  };

  const inCart = cart.find(i => i.id === product?.id);

  if (loading) {
    return <div className="product-detail-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="product-detail-loading">Product not found</div>;
  }

  const badgeColor = {
    'Bestseller': '#f59e0b',
    'New': '#3b82f6',
    'Hot Deal': '#ef4444',
    'Trending': '#a78bfa',
  };

  // Generate mock reviews based on product data
  const reviews = [
    {
      id: 1,
      author: 'Rahul Kumar',
      rating: 5,
      date: '2 days ago',
      title: 'Excellent product!',
      comment: `This ${product.name} exceeded my expectations. Great quality and fast delivery.`,
      helpful: 24
    },
    {
      id: 2,
      author: 'Priya Singh',
      rating: 4,
      date: '1 week ago',
      title: 'Very satisfied',
      comment: 'Good value for money. Works as described. Slight packaging issue but product is perfect.',
      helpful: 18
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 5,
      date: '2 weeks ago',
      title: 'Perfect!',
      comment: 'Just what I was looking for. Highly recommend to anyone considering this product.',
      helpful: 31
    },
  ];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>Home</button>
        <span>/</span>
        <button onClick={() => navigate('/')}>{product.category}</button>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail-container">
        {/* Left: Image */}
        <div className="detail-image-section">
          <div className="main-image-wrap">
            <img src={product.image} alt={product.name} className="main-product-image" />
            {product.badge && (
              <span className="detail-badge" style={{ backgroundColor: badgeColor[product.badge] || '#666' }}>
                {product.badge}
              </span>
            )}
          </div>
          <div className="stock-indicator" style={{ color: product.stock > 10 ? '#10b981' : product.stock > 5 ? '#f59e0b' : '#ef4444' }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="detail-info-section">
          <div className="detail-header">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="detail-rating">
            <Stars rating={product.rating} />
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({product.reviews.toLocaleString('en-IN')} reviews)</span>
            <span className="rating-verified">✓ Verified Purchase Reviews</span>
          </div>

          {/* Price */}
          <div className="detail-price-section">
            <div className="price-display">
              <span className="main-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="original-price">₹{(product.price * 1.25).toLocaleString('en-IN')}</span>
              <span className="discount">20% off</span>
            </div>
            <p className="inclusive-tax">Inclusive of all taxes</p>
          </div>

          {/* Description */}
          <div className="detail-description">
            <p>{product.description}</p>
          </div>

          {/* Quantity & Action */}
          <div className="detail-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="qty-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1}>−</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button 
              className={`add-to-cart-btn ${adding ? 'adding' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {adding ? '✓ Added!' : product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
            </button>

            <button 
              className="buy-now-btn" 
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              💳 Buy Now
            </button>
          </div>

          {inCart && (
            <div className="in-cart-notice">
              ✓ {inCart.quantity} item(s) already in your cart
            </div>
          )}

          {/* Delivery & Returns */}
          <div className="detail-info-cards">
            <div className="info-card">
              <span className="info-icon">🚚</span>
              <div>
                <p className="info-title">Free Delivery</p>
                <p className="info-desc">On orders above ₹500</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🔄</span>
              <div>
                <p className="info-title">Easy Returns</p>
                <p className="info-desc">7-day return policy</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🛡️</span>
              <div>
                <p className="info-title">Secure & Safe</p>
                <p className="info-desc">100% authentic products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="detail-tabs-section">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews & Ratings
          </button>
        </div>

        {/* Specifications Tab */}
        {activeTab === 'details' && (
          <div className="tab-content specifications">
            <div className="specs-grid">
              <div className="spec-item">
                <label>Product Name</label>
                <value>{product.name}</value>
              </div>
              <div className="spec-item">
                <label>Category</label>
                <value>{product.category}</value>
              </div>
              <div className="spec-item">
                <label>Price</label>
                <value style={{ color: '#10b981', fontWeight: 'bold' }}>₹{product.price.toLocaleString('en-IN')}</value>
              </div>
              <div className="spec-item">
                <label>Rating</label>
                <value>
                  <Stars rating={product.rating} /> {product.rating}/5
                </value>
              </div>
              <div className="spec-item">
                <label>Stock Available</label>
                <value style={{ color: product.stock > 10 ? '#10b981' : '#f59e0b' }}>
                  {product.stock} units
                </value>
              </div>
              <div className="spec-item">
                <label>Reviews</label>
                <value>{product.reviews.toLocaleString('en-IN')} verified reviews</value>
              </div>
              {product.badge && (
                <div className="spec-item">
                  <label>Badge</label>
                  <value>
                    <span className="badge-tag" style={{ backgroundColor: badgeColor[product.badge] }}>
                      {product.badge}
                    </span>
                  </value>
                </div>
              )}
            </div>

            <div className="specifications-full">
              <h3>📋 Product Details</h3>
              <p>{product.description}</p>
              <div className="features-list">
                <h4>Key Features:</h4>
                <ul>
                  <li>✓ Premium quality materials</li>
                  <li>✓ Excellent durability and performance</li>
                  <li>✓ Backed by customer reviews</li>
                  <li>✓ Easy to use and maintain</li>
                  <li>✓ Best value for money</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-content reviews">
            <div className="reviews-summary">
              <div className="summary-stat">
                <p className="summary-rating">{product.rating}</p>
                <div className="summary-stars">
                  <Stars rating={product.rating} />
                </div>
                <p className="summary-count">Based on {product.reviews.toLocaleString('en-IN')} reviews</p>
              </div>

              <div className="rating-bars">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="rating-bar-item">
                    <span className="bar-label">{stars}★</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1)}%` }}></div>
                    </div>
                    <span className="bar-percent">{Math.round((stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1))}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-list">
              <h3>Customer Reviews</h3>
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div>
                      <p className="review-author">{review.author}</p>
                      <div className="review-rating">
                        <Stars rating={review.rating} />
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="review-title">{review.title}</h4>
                  <p className="review-comment">{review.comment}</p>
                  <button className="helpful-btn">👍 Helpful ({review.helpful})</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
