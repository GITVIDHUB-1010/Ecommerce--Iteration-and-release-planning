import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div className="success-page">
      <div className={`success-card ${show ? 'visible' : ''}`}>
        <div className="success-anim">
          <div className="success-ring" />
          <div className="success-check">✓</div>
        </div>
        <h1>Order Confirmed!</h1>
        <p className="success-msg">Thank you! Your order has been placed and is being processed.</p>

        <div className="order-id-box">
          <p className="oid-label">Order ID</p>
          <p className="oid-val">#{id}</p>
          <p className="oid-sub">Keep this ID to track your order</p>
        </div>

        <div className="success-steps">
          <div className="ss-step">
            <span className="ss-icon">📦</span>
            <span>Order Placed</span>
          </div>
          <div className="ss-arrow">→</div>
          <div className="ss-step muted">
            <span className="ss-icon">🚚</span>
            <span>Shipped</span>
          </div>
          <div className="ss-arrow">→</div>
          <div className="ss-step muted">
            <span className="ss-icon">🏠</span>
            <span>Delivered</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/orders')}>
            Track My Order
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
