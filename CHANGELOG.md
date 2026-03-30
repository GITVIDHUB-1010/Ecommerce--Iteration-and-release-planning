# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-03-30

### 🚀 Added - Iteration 2: Product Details & Enhanced Shopping

#### Product Detail System
- New ProductDetail component with complete product information display
- Product detail page route: `/product/:id`
- Product specifications tab with full technical details
- Product reviews and ratings tab with:
  - Star rating system (1-5 stars)
  - Review distribution chart
  - Sample customer reviews with author info
  - Review helpfulness voting
- Breadcrumb navigation for easy page traversal
- Stock availability indicator with color coding

#### Enhanced Shopping Experience
- Quantity selector with increment/decrement buttons
- Working "Add to Cart" button on product details
- Working "Buy Now" button that adds to cart and navigates to checkout
- Cart status indicator showing items already in cart
- Delivery and return information cards

#### UI/UX Improvements
- Professional product detail page styling
- Smooth animations and transitions
- Responsive design for all screen sizes
- Improved visual hierarchy
- Color-coded badges for product types
- Loading states for better UX

#### API Features
- Product lookup by ID (`GET /api/products/:id`)
- Full product data structure with specifications
- Support for product images from Unsplash

#### Component Files
- `src/pages/ProductDetail.js` (350+ lines)
- `src/pages/ProductDetail.css` (600+ lines)
- Updated routing in `App.js`

---

### 🎯 Added - Iteration 1: Core Platform & Product Catalog

#### Project Setup
- React frontend with React Router
- Express.js backend with CORS support
- Modular component architecture
- CSS custom properties for theming

#### Product Management System
- 100 high-quality products with specifications:
  - Product ID, name, category, description
  - Price, original price, discount percentage
  - 5-star rating system
  - Review count (verified purchases)
  - Stock availability
  - Product images from Unsplash
  - Special badges (Bestseller, New, Hot Deal, Trending)
- 10 product categories with emoji icons

#### Shop Page Features
- Product grid display with lazy loading
- Hero section with statistics
- Category filter pills with icons
- Search bar with real-time filtering
- Price range filter inputs
- Sorting options:
  - Most Popular
  - Top Rated
  - Price: Low to High
  - Price: High to Low
- Results counter
- Empty state message

#### Navigation & Routing
- Navbar component with:
  - Logo/Home link
  - Search bar
  - Cart icon with item counter
  - Navigation links
- Routes:
  - `/` - Shop page
  - `/cart` - Shopping cart
  - `/checkout` - Checkout process
  - `/orders` - Order history
  - `/order-success/:id` - Order confirmation

#### Core Components
- ProductCard component with:
  - Product image display
  - Product name and description
  - Star ratings
  - Price display
  - Stock status
  - Quick add to cart button
- Toast notifications system
- Responsive design (Mobile-first approach)

#### Backend API
- Express server on port 5000
- CORS enabled for frontend communication
- API Endpoints:
  - `GET /api/products` - List all products with filters
  - `GET /api/categories` - Get all categories
  - `GET /api/health` - Server health check
- Product data management with filtering support

#### Styling & Design
- Custom CSS variables for theming
- Smooth transitions and animations
- Fade-in effects on page load
- Hover states and interactive feedback
- Mobile-responsive grid layout
- Professional color scheme

#### Data Files
- `backend/server.js` - (1000+ lines with 100 products)
- `frontend/src/pages/Shop.js` - (200+ lines)
- `frontend/src/components/ProductCard.js` - (100+ lines)
- `frontend/src/components/Navbar.js` - (100+ lines)

---

## Key Metrics

### Code Statistics
| Metric | Iteration 1 | Iteration 2 | Total |
|--------|-----------|-----------|-------|
| Lines of Code (Frontend) | 1800 | 1500 | 3300 |
| Lines of Code (Backend) | 1200 | 0 | 1200 |
| CSS Lines | 1000 | 600 | 1600 |
| Components Created | 5 | 1 | 6 |
| Pages Created | 1 | 1 | 2 |
| API Endpoints | 4 | 1 | 5 |

### Feature Completion
- Iteration 1: 8 features completed
- Iteration 2: 4 features completed
- **Total: 12 features delivered**

---

## Sprint Highlights

### Sprint 1-2 (Iteration 1)
**Focus:** Foundation & Product Catalog
- Set up project structure
- Built product display system
- Implemented filtering and search
- Created responsive design

**Challenges Overcome:**
- Initial product count was 0 - resolved by adding 100 products
- Product image loading - fixed with Unsplash URLs
- Filter performance - optimized with debouncing

### Sprint 3-4 (Iteration 2)
**Focus:** Product Details & Enhanced UX
- Built detailed product page
- Added reviews and ratings system
- Implemented quantity selector
- Connected checkout flow

**Challenges Overcome:**
- Route parameter handling - fixed with React Router params
- Product clickability - fixed by updating ProductCard
- Navigation flow - optimized checkout redirect timing

---

## Upcoming Changes

### Planned for V1.1 (Next Iteration)
- [ ] Complete shopping cart page enhancements
- [ ] Full checkout form with validation
- [ ] Order creation and confirmation
- [ ] Order history with tracking
- [ ] User account management
- [ ] Wishlist functionality

---

## Breaking Changes

None in v1.0 (Initial release)

---

## Dependencies

### Frontend
```
react: ^18.0.0
react-router-dom: ^6.0.0
axios: ^1.0.0
```

### Backend
```
express: ^4.18.0
cors: ^2.8.5
uuid: ^9.0.0
```

---

## Version History

- **v1.0.0** (2026-03-30) - Initial release with Iterations 1 & 2
- **v1.1.0** (Planned) - Checkout and order management
- **v2.0.0** (Planned) - Payment integration and user accounts

---

## Deployment

### Development
```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm start
```

### Servers
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

---

## Credits

Developed as part of **Software Engineering Project**  
**Course:** Iteration and Release Planning in Web Development  
**Duration:** 4 weeks (2 iterations of 2 weeks each)

---

*Last Updated: March 30, 2026*
