import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch, total } = useCart();
  const navigate = useNavigate();

  const update = (id, qty) => {
    if (qty < 1) { dispatch({ type: 'REMOVE_ITEM', payload: id }); return; }
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  };

  const savings = Math.floor(total * 0.1);

  if (cart.length === 0) return (
    <div className="cart-page">
      <div className="empty-state fade-up">
        <div className="icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet</p>
        <button className="btn btn-primary btn-lg" style={{ marginTop: 24 }} onClick={() => navigate('/')}>
          Start Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-header fade-up">
        <h1>Shopping Cart</h1>
        <span className="cart-item-count">{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
      </div>

      <div className="cart-layout">
        {/* Items list */}
        <div className="cart-items fade-up-1">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img-wrap">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </div>
              <div className="cart-item-details">
                <span className="cart-item-cat">{item.category}</span>
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-desc">{item.description?.slice(0, 80)}...</p>
                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => update(item.id, item.quantity - 1)}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => update(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-link" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-price-col">
                <span className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                <span className="cart-item-unit">₹{item.price.toLocaleString('en-IN')} each</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary fade-up-2">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="divider" />

            <div className="summary-rows">
              {cart.map(item => (
                <div key={item.id} className="summary-row">
                  <span className="s-name">{item.name} <span className="s-qty">× {item.quantity}</span></span>
                  <span className="s-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-tag">FREE</span>
            </div>
            <div className="summary-row savings-row">
              <span>You save</span>
              <span>₹{savings.toLocaleString('en-IN')}</span>
            </div>

            <div className="divider" />
            <div className="summary-total">
              <span>Total</span>
              <span className="total-amt">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout →
            </button>
            <button className="btn btn-ghost btn-full" style={{ marginTop: 10 }} onClick={() => navigate('/')}>
              ← Continue Shopping
            </button>

            <div className="trust-badges">
              <span>🔒 Secure Checkout</span>
              <span>🚚 Free Delivery</span>
              <span>↩️ Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
