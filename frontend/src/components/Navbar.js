import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { count } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="logo-mark">S</div>
          <span className="logo-name">Shopiq</span>
        </Link>

        <div className="nav-links">
          {[
            { to: '/', label: 'Shop' },
            { to: '/project-info', label: '📊 Project Info' },
            { to: '/orders', label: 'My Orders' }
          ].map(({ to, label }) => (
            <Link key={to} to={to} className={`nav-link ${pathname === to || (to !== '/' && pathname.startsWith(to)) ? 'active' : ''}`}>
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="cart-label">Cart</span>
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
