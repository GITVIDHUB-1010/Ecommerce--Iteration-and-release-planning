import React, { useState } from 'react';
import './ProjectInfo.css';

const ProjectInfo = () => {
  const [activeIteration, setActiveIteration] = useState(1);

  const iterations = [
    {
      id: 1,
      title: 'Iteration 1: Core Foundation & Product Catalog',
      duration: 'Week 1-2',
      status: 'COMPLETED',
      color: '#10b981',
      features: [
        {
          name: 'Product Database Setup',
          description: '100 products across 10 categories',
          completed: true
        },
        {
          name: 'Product Grid Display',
          description: 'Responsive product listing with images and prices',
          completed: true
        },
        {
          name: 'Search Functionality',
          description: 'Search by product name and description',
          completed: true
        },
        {
          name: 'Category Filtering',
          description: 'Filter products by category with emoji icons',
          completed: true
        },
        {
          name: 'Price Range Filtering',
          description: 'Filter products by min and max price',
          completed: true
        },
        {
          name: 'Sorting System',
          description: 'Sort by popular, rating, price (asc/desc)',
          completed: true
        },
        {
          name: 'Navigation Bar',
          description: 'Main navigation with cart counter',
          completed: true
        },
        {
          name: 'Responsive Design',
          description: 'Mobile, Tablet, and Desktop support',
          completed: true
        }
      ]
    },
    {
      id: 2,
      title: 'Iteration 2: Product Details & Enhanced Shopping',
      duration: 'Week 3-4',
      status: 'COMPLETED',
      color: '#3b82f6',
      features: [
        {
          name: 'Product Detail Page',
          description: 'Individual page for each product (/product/:id)',
          completed: true
        },
        {
          name: 'Product Specifications',
          description: 'Detailed specs tab with all product information',
          completed: true
        },
        {
          name: 'Reviews & Ratings',
          description: 'Customer reviews with 5-star rating system',
          completed: true
        },
        {
          name: 'Rating Distribution Chart',
          description: 'Visual breakdown of 5★, 4★, 3★, 2★, 1★ ratings',
          completed: true
        },
        {
          name: 'Quantity Selector',
          description: 'Select quantity with +/- buttons before purchase',
          completed: true
        },
        {
          name: 'Add to Cart Button',
          description: 'Add products with selected quantity to cart',
          completed: true
        },
        {
          name: 'Buy Now Button',
          description: 'Quick purchase that adds to cart and goes to checkout',
          completed: true
        },
        {
          name: 'Stock Availability',
          description: 'Display stock status and out of stock indicator',
          completed: true
        }
      ]
    },
    {
      id: 3,
      title: 'Iteration 3: Cart & Checkout System',
      duration: 'Week 5-6',
      status: 'PLANNED',
      color: '#a78bfa',
      features: [
        {
          name: 'Shopping Cart Page',
          description: 'View and manage items in cart',
          completed: false
        },
        {
          name: 'Checkout Form',
          description: 'Customer info, address, and shipping selection',
          completed: false
        },
        {
          name: 'Order Creation',
          description: 'Create and store orders in database',
          completed: false
        },
        {
          name: 'Order Confirmation',
          description: 'Order success page with details',
          completed: false
        },
        {
          name: 'Order History',
          description: 'View past orders with tracking',
          completed: false
        },
        {
          name: 'Order Tracking',
          description: 'Real-time order status updates (Placed, Shipped, Delivered)',
          completed: false
        }
      ]
    }
  ];

  const stats = [
    { label: 'Total Products', value: '100+', icon: '📦' },
    { label: 'Categories', value: '10', icon: '🏷️' },
    { label: 'Iterations', value: '2 Done', icon: '🔄' },
    { label: 'Features Completed', value: '16', icon: '✅' },
  ];

  const technologies = {
    frontend: ['React 18', 'React Router', 'Axios', 'CSS3'],
    backend: ['Node.js', 'Express.js', 'CORS', 'UUID'],
    concepts: ['Component Architecture', 'RESTful API', 'State Management', 'Responsive Design']
  };

  return (
    <div className="project-info-page">
      {/* Header */}
      <section className="info-hero">
        <div className="hero-content">
          <h1>Ecommerce Platform</h1>
          <p>Full-Stack Web Development Project</p>
          <p className="hero-subtitle">Iteration & Release Planning in Action</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <h2>Project Timeline</h2>
        <div className="timeline-container">
          {iterations.map((iter) => (
            <div 
              key={iter.id} 
              className={`timeline-item ${activeIteration === iter.id ? 'active' : ''}`}
              onClick={() => setActiveIteration(iter.id)}
            >
              <div className="timeline-marker" style={{ backgroundColor: iter.color }}>
                {iter.id}
              </div>
              <div className="timeline-content">
                <h3>{iter.title}</h3>
                <p className="timeline-duration">{iter.duration}</p>
                <span className={`status-badge ${iter.status.toLowerCase()}`}>
                  {iter.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Iteration Details */}
      <section className="iteration-details">
        <div className="iteration-header">
          <h2>{iterations[activeIteration - 1].title}</h2>
          <p className="iteration-duration">{iterations[activeIteration - 1].duration}</p>
          <span 
            className={`status-badge large ${iterations[activeIteration - 1].status.toLowerCase()}`}
            style={{ borderColor: iterations[activeIteration - 1].color }}
          >
            {iterations[activeIteration - 1].status}
          </span>
        </div>

        <div className="features-grid">
          {iterations[activeIteration - 1].features.map((feature, idx) => (
            <div key={idx} className={`feature-card ${feature.completed ? 'completed' : 'planned'}`}>
              <div className="feature-header">
                <h4>{feature.name}</h4>
                <span className="feature-icon">
                  {feature.completed ? '✅' : '⏳'}
                </span>
              </div>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="iteration-stats">
          <div className="stat-item">
            <span className="stat-num">
              {iterations[activeIteration - 1].features.filter(f => f.completed).length}/{iterations[activeIteration - 1].features.length}
            </span>
            <span className="stat-text">Features Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-text">Sprint Velocity</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">~1500</span>
            <span className="stat-text">Lines of Code</span>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="technologies-section">
        <h2>Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>🎨 Frontend</h3>
            <ul>
              {technologies.frontend.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="tech-card">
            <h3>⚙️ Backend</h3>
            <ul>
              {technologies.backend.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="tech-card">
            <h3>📚 Concepts</h3>
            <ul>
              {technologies.concepts.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features by Release */}
      <section className="releases-section">
        <h2>Release Planning</h2>
        <div className="releases-grid">
          <div className="release-card v1">
            <h3>🚀 Release V1.0</h3>
            <p className="release-date">Current</p>
            <ul className="release-features">
              <li>✅ 100+ Products Catalog</li>
              <li>✅ Advanced Search & Filter</li>
              <li>✅ Product Detail Pages</li>
              <li>✅ Reviews & Ratings</li>
              <li>✅ Add to Cart Feature</li>
              <li>✅ Buy Now Feature</li>
            </ul>
          </div>
          
          <div className="release-card v1-1">
            <h3>📦 Release V1.1</h3>
            <p className="release-date">Planned</p>
            <ul className="release-features">
              <li>🔄 Shopping Cart Management</li>
              <li>🔄 Checkout Form</li>
              <li>🔄 Order Creation</li>
              <li>🔄 Order Confirmation</li>
              <li>🔄 Order History</li>
              <li>🔄 Order Tracking</li>
            </ul>
          </div>

          <div className="release-card v2">
            <h3>🔮 Release V2.0</h3>
            <p className="release-date">Future</p>
            <ul className="release-features">
              <li>👤 User Accounts</li>
              <li>❤️ Wishlist</li>
              <li>💳 Payment Integration</li>
              <li>📊 Admin Dashboard</li>
              <li>📈 Analytics</li>
              <li>🔐 Enhanced Security</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sprint Summary */}
      <section className="sprint-summary">
        <h2>Sprint Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Iteration 1: Foundation</h3>
            <div className="summary-details">
              <p><strong>Duration:</strong> Week 1-2</p>
              <p><strong>Stories:</strong> 8/8 Completed ✅</p>
              <p><strong>Velocity:</strong> 100%</p>
              <p><strong>Code:</strong> ~2000 lines</p>
              <p><strong>Focus:</strong> Product catalog & filtering</p>
            </div>
          </div>

          <div className="summary-card">
            <h3>Iteration 2: Enhancement</h3>
            <div className="summary-details">
              <p><strong>Duration:</strong> Week 3-4</p>
              <p><strong>Stories:</strong> 8/8 Completed ✅</p>
              <p><strong>Velocity:</strong> 100%</p>
              <p><strong>Code:</strong> ~1500 lines</p>
              <p><strong>Focus:</strong> Product details & shopping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="achievements-section">
        <h2>Key Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement">
            <span className="achievement-icon">📊</span>
            <h4>Iterative Development</h4>
            <p>Completed 2 full iterations with 100% sprint velocity</p>
          </div>
          <div className="achievement">
            <span className="achievement-icon">🎯</span>
            <h4>Feature Delivery</h4>
            <p>16 user stories completed on schedule</p>
          </div>
          <div className="achievement">
            <span className="achievement-icon">💎</span>
            <h4>Quality Code</h4>
            <p>~3500 lines of clean, maintainable code</p>
          </div>
          <div className="achievement">
            <span className="achievement-icon">📱</span>
            <h4>Responsive Design</h4>
            <p>Works perfectly on Mobile, Tablet, and Desktop</p>
          </div>
          <div className="achievement">
            <span className="achievement-icon">🚀</span>
            <h4>Performance</h4>
            <p>Fast load times and smooth animations</p>
          </div>
          <div className="achievement">
            <span className="achievement-icon">✨</span>
            <h4>User Experience</h4>
            <p>Professional, intuitive interface with good UX</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Try the Application</h2>
        <p>Click the buttons below to explore the features completed in each iteration:</p>
        <div className="cta-buttons">
          <a href="/" className="cta-btn shop-btn">
            🛍️ Visit Shop (Iteration 1)
          </a>
          <a href="/product/1" className="cta-btn detail-btn">
            📄 View Product Details (Iteration 2)
          </a>
          <a href="/cart" className="cta-btn cart-btn">
            🛒 View Cart (In Development)
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectInfo;
