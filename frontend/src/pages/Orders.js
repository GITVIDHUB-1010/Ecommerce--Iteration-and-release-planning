import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const statusStep = { 'Placed': 0, 'Shipped': 1, 'Delivered': 2 };
const statusSteps = [
  { label: 'Order Placed', icon: '📋', desc: 'Your order has been confirmed' },
  { label: 'Shipped', icon: '🚚', desc: 'Your order is on the way' },
  { label: 'Delivered', icon: '🏠', desc: 'Package delivered successfully' },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
      if (selected) {
        const updated = data.find(o => o.id === selected.id);
        if (updated) setSelected(updated);
      }
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const statusBadge = (status) => {
    if (status === 'Delivered') return 'badge-success';
    if (status === 'Shipped') return 'badge-warning';
    return 'badge-info';
  };

  if (loading) return (
    <div className="loading-center">
      <div className="spinner" />
      <span>Loading your orders...</span>
    </div>
  );

  if (orders.length === 0) return (
    <div className="orders-page">
      <div className="empty-state fade-up">
        <div className="icon">📦</div>
        <h3>No orders yet</h3>
        <p>Your order history will appear here once you place an order</p>
      </div>
    </div>
  );

  return (
    <div className="orders-page">
      <div className="orders-header fade-up">
        <h1>My Orders</h1>
        <span className="orders-count">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="orders-layout">
        {/* Order List */}
        <div className="order-list fade-up-1">
          {orders.map(order => (
            <div
              key={order.id}
              className={`order-card ${selected?.id === order.id ? 'active' : ''}`}
              onClick={() => setSelected(order === selected ? null : order)}
            >
              <div className="oc-top">
                <div className="oc-id">#{order.id}</div>
                <span className={`badge ${statusBadge(order.status)}`}>{order.status}</span>
              </div>
              <p className="oc-name">{order.customerName}</p>
              <div className="oc-items-preview">
                {order.items.slice(0, 3).map(item => (
                  <img key={item.id} src={item.image} alt={item.name} className="oc-thumb" title={item.name} />
                ))}
                {order.items.length > 3 && <span className="oc-more">+{order.items.length - 3}</span>}
              </div>
              <div className="oc-bottom">
                <span className="oc-meta">{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="oc-total">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Detail */}
        {selected ? (
          <div className="order-detail fade-up-2">
            {/* Header */}
            <div className="od-header">
              <div>
                <h2>Order #{selected.id}</h2>
                <p className="od-date">Placed on {new Date(selected.placedAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <span className={`badge ${statusBadge(selected.status)}`} style={{ fontSize: 13, padding: '5px 14px' }}>
                {selected.status}
              </span>
            </div>

            {/* Tracker */}
            <div className="tracker-wrap">
              {statusSteps.map((s, i) => {
                const current = statusStep[selected.status];
                const done = i <= current;
                const isCurrent = i === current;
                return (
                  <React.Fragment key={s.label}>
                    <div className={`tracker-step ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="tracker-icon">{s.icon}</div>
                      <div className="tracker-text">
                        <p className="tracker-label">{s.label}</p>
                        <p className="tracker-desc">{s.desc}</p>
                        {isCurrent && selected.timeline[i] && (
                          <p className="tracker-time">
                            {new Date(selected.timeline[i].time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </div>
                    {i < 2 && <div className={`tracker-connector ${i < current ? 'done' : ''}`} />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="divider" />

            {/* Delivery Address */}
            <div className="od-section">
              <h4 className="od-section-title">
                <span>📍</span> Delivery Address
              </h4>
              <p className="od-address">{selected.address}</p>
              <p className="od-customer">For: {selected.customerName}</p>
            </div>

            <div className="divider" />

            {/* Items */}
            <div className="od-section">
              <h4 className="od-section-title">
                <span>📦</span> Items Ordered ({selected.items.length})
              </h4>
              <div className="od-items">
                {selected.items.map(item => (
                  <div key={item.id} className="od-item">
                    <img src={item.image} alt={item.name} className="od-item-img" />
                    <div className="od-item-info">
                      <p className="od-item-name">{item.name}</p>
                      <p className="od-item-cat">{item.category}</p>
                      <p className="od-item-qty">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="od-item-total">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider" />

            {/* Total */}
            <div className="od-summary">
              <div className="od-sum-row"><span>Subtotal</span><span>₹{selected.total.toLocaleString('en-IN')}</span></div>
              <div className="od-sum-row"><span>Delivery</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE</span></div>
              <div className="od-sum-total">
                <span>Order Total</span>
                <span>₹{selected.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-placeholder fade-up-2">
            <span>🗂️</span>
            <p>Select an order to view details & track status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
