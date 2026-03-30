import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cart, total, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  if (cart.length === 0) { navigate('/'); return null; }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep1 = () => form.name && form.email && form.phone;
  const validateStep2 = () => form.address && form.city && form.pincode;

  const handleOrder = async () => {
    if (!validateStep2()) { setError('Please fill all delivery details.'); return; }
    setLoading(true); setError('');
    try {
      const { data } = await axios.post('/api/orders', {
        items: cart,
        customerName: form.name,
        address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`
      });
      dispatch({ type: 'CLEAR_CART' });
      navigate(`/order-success/${data.id}`);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      {/* Steps indicator */}
      <div className="steps-wrap fade-up">
        {['Contact', 'Delivery', 'Payment'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`step ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
              <div className="step-dot">{step > i + 1 ? '✓' : i + 1}</div>
              <span className="step-label">{s}</span>
            </div>
            {i < 2 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-wrap fade-up-1">

          {/* Step 1: Contact */}
          {step === 1 && (
            <div className="form-block">
              <h2>Contact Information</h2>
              <p className="form-intro">We'll use this for order updates</p>
              <div className="divider" />
              <div className="form-row-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input placeholder="Ananya Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 24 }}
                onClick={() => validateStep1() ? setStep(2) : setError('Fill all contact details.')}
                disabled={!validateStep1()}>
                Continue to Delivery →
              </button>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="form-block">
              <h2>Delivery Address</h2>
              <p className="form-intro">Where should we deliver your order?</p>
              <div className="divider" />
              <div className="form-group">
                <label>Street Address *</label>
                <input placeholder="House No., Street, Area" value={form.address} onChange={e => set('address', e.target.value)} />
              </div>
              <div className="form-row-3">
                <div className="form-group">
                  <label>City *</label>
                  <input placeholder="Kakinada" value={form.city} onChange={e => set('city', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input placeholder="Andhra Pradesh" value={form.state} onChange={e => set('state', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input placeholder="533001" value={form.pincode} onChange={e => set('pincode', e.target.value)} />
                </div>
              </div>
              <div className="step-nav">
                <button className="btn btn-ghost" onClick={() => { setStep(1); setError(''); }}>← Back</button>
                <button className="btn btn-primary btn-lg"
                  onClick={() => validateStep2() ? setStep(3) : setError('Fill all delivery details.')}
                  disabled={!validateStep2()}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="form-block">
              <h2>Payment Method</h2>
              <p className="form-intro">All transactions are secure and encrypted</p>
              <div className="divider" />
              <div className="payment-option selected">
                <div className="pay-radio">✓</div>
                <div>
                  <p className="pay-title">Cash on Delivery</p>
                  <p className="pay-desc">Pay when your order is delivered at your doorstep</p>
                </div>
                <span className="pay-tag">Available</span>
              </div>
              <div className="payment-option disabled">
                <div className="pay-radio" />
                <div>
                  <p className="pay-title">Credit / Debit Card</p>
                  <p className="pay-desc">Visa, Mastercard, Rupay</p>
                </div>
                <span className="pay-tag coming">Coming Soon</span>
              </div>
              <div className="payment-option disabled">
                <div className="pay-radio" />
                <div>
                  <p className="pay-title">UPI / PhonePe / GPay</p>
                  <p className="pay-desc">Instant payment via UPI apps</p>
                </div>
                <span className="pay-tag coming">Coming Soon</span>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="step-nav" style={{ marginTop: 24 }}>
                <button className="btn btn-ghost" onClick={() => { setStep(2); setError(''); }}>← Back</button>
                <button className="btn btn-primary btn-lg" onClick={handleOrder} disabled={loading}>
                  {loading ? 'Placing Order...' : `Place Order · ₹${total.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}

          {error && step < 3 && <p className="form-error" style={{ marginTop: 12 }}>{error}</p>}
        </div>

        {/* Order review */}
        <div className="checkout-review fade-up-2">
          <div className="review-card">
            <h3>Your Order</h3>
            <div className="divider" />
            <div className="review-items">
              {cart.map(item => (
                <div key={item.id} className="review-item">
                  <div className="review-img-wrap">
                    <img src={item.image} alt={item.name} />
                    <span className="review-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="review-info">
                    <p className="review-name">{item.name}</p>
                    <p className="review-cat">{item.category}</p>
                  </div>
                  <span className="review-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="review-total-rows">
              <div className="rtrow"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
              <div className="rtrow"><span>Delivery</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE</span></div>
            </div>
            <div className="review-final">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="secure-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              SSL encrypted & secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
