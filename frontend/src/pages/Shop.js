import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const CATEGORIES_ICONS = {
  Electronics: '💻', Footwear: '👟', Clothing: '👕',
  Accessories: '👜', Fitness: '🏋️', Kitchen: '🍳',
  Home: '🏠', Stationery: '📚', Beauty: '✨', Grocery: '🛒'
};

const Shop = ({ onToast }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '', sort: '' });

  const showToast = (msg, type = 'success') => {
    if (onToast) {
      onToast(msg, type);
    } else {
      const id = Date.now();
      setToasts(t => [...t, { id, msg, type }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800);
    }
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sort) params.sort = filters.sort;
      const { data } = await axios.get('/api/products', { params });
      setProducts(data);
    } catch { showToast('Failed to load products', 'error'); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { axios.get('/api/categories').then(r => setCategories(r.data)); }, []);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 250);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  const clear = () => setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: '' });
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="shop-page">
      {/* Hero */}
      <section className="shop-hero fade-up">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to Shopiq</p>
          <h1 className="hero-title">Everything you<br /><em>love, delivered.</em></h1>
          <p className="hero-sub">100+ curated products across 10 categories — electronics, fashion, home & more.</p>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">100+</span><span className="stat-label">Products</span></div>
          <div className="stat-sep" />
          <div className="stat"><span className="stat-num">10</span><span className="stat-label">Categories</span></div>
          <div className="stat-sep" />
          <div className="stat"><span className="stat-num">4.6★</span><span className="stat-label">Avg Rating</span></div>
        </div>
      </section>

      {/* Category pills */}
      <section className="category-row fade-up-1">
        <button className={`cat-pill ${!filters.category ? 'active' : ''}`} onClick={() => set('category', '')}>
          All
        </button>
        {categories.map(c => (
          <button key={c} className={`cat-pill ${filters.category === c ? 'active' : ''}`} onClick={() => set('category', filters.category === c ? '' : c)}>
            <span>{CATEGORIES_ICONS[c] || '📦'}</span> {c}
          </button>
        ))}
      </section>

      {/* Filter bar */}
      <section className="filter-bar fade-up-2">
        <div className="search-group">
          <svg className="search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input className="search-inp" placeholder="Search products, brands..." value={filters.search} onChange={e => set('search', e.target.value)} />
          {filters.search && <button className="clear-x" onClick={() => set('search', '')}>✕</button>}
        </div>

        <div className="filter-right">
          <div className="price-inputs">
            <input type="number" placeholder="Min ₹" value={filters.minPrice} onChange={e => set('minPrice', e.target.value)} />
            <span className="price-dash">–</span>
            <input type="number" placeholder="Max ₹" value={filters.maxPrice} onChange={e => set('maxPrice', e.target.value)} />
          </div>

          <select value={filters.sort} onChange={e => set('sort', e.target.value)}>
            <option value="">Sort by</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {hasFilters && <button className="btn btn-ghost btn-sm" onClick={clear}>✕ Clear all</button>}
        </div>
      </section>

      {/* Results count */}
      <div className="results-meta fade-up-3">
        {!loading && (
          <p>{products.length} product{products.length !== 1 ? 's' : ''} {filters.category ? `in ${filters.category}` : 'found'}</p>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="skeleton-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton" style={{ height: 220 }} />
              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="skeleton" style={{ height: 10, width: '40%' }} />
                <div className="skeleton" style={{ height: 14, width: '90%' }} />
                <div className="skeleton" style={{ height: 12, width: '70%' }} />
                <div className="skeleton" style={{ height: 20, width: '40%', marginTop: 6 }} />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
          <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={clear}>Clear Filters</button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard
              key={p.id} product={p} onToast={showToast}
              style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s`, animation: 'fadeUp 0.4s ease both' }}
            />
          ))}
        </div>
      )}

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <div className="toast-icon">{t.type === 'success' ? '✓' : '!'}</div>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
