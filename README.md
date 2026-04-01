# 🛒 Agile E-Commerce Website

A full-stack e-commerce application built with **React** (frontend) and **Node.js/Express** (backend), covering all features from the SRS document across both Release 1 and Release 2.

> **🎯 Ready to Deploy?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for live deployment instructions on Vercel + Railway!

---

## 📦 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router v6, Axios    |
| Backend   | Node.js, Express, UUID              |
| Data      | Mock/static data (in-memory)        |
| Styling   | Custom CSS with design system       |

---

## 🚀 Features Implemented

### Release 1 — MVP
- ✅ Product listing with images, prices, descriptions
- ✅ Search by product name
- ✅ Filter by category and price range
- ✅ Cart management (add, update quantity, remove)
- ✅ Cart total display
- ✅ Checkout form with delivery details
- ✅ Order placement with unique Order ID
- ✅ Order confirmation page

### Release 2
- ✅ Order history page
- ✅ Live order status tracking (Placed → Shipped → Delivered)
- ✅ Visual step tracker with auto-update every 5s
- ✅ Status auto-progresses after 15s (Shipped) and 30s (Delivered)
- ✅ Full order detail view with items and address

---

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── server.js          # Express API with all routes
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js / .css
│   │   │   └── ProductCard.js / .css
│   │   ├── context/
│   │   │   └── CartContext.js     # Global cart state
│   │   ├── pages/
│   │   │   ├── Shop.js / .css     # Product listing + filters
│   │   │   ├── Cart.js / .css     # Cart management
│   │   │   ├── Checkout.js / .css # Order form
│   │   │   ├── OrderSuccess.js    # Confirmation
│   │   │   └── Orders.js / .css   # History + tracking
│   │   ├── App.js                 # Routes
│   │   ├── index.js
│   │   └── index.css              # Design system
│   └── package.json
└── package.json           # Root with run scripts
```

---

## ⚙️ Setup & Running

### Prerequisites
- Node.js v16+ installed
- npm installed

### Step 1 — Install dependencies
```bash
# From the ecommerce/ root folder:
cd backend && npm install
cd ../frontend && npm install
```

### Step 2 — Start the backend
```bash
cd backend
node server.js
# Runs on http://localhost:5000
```

### Step 3 — Start the frontend (new terminal)
```bash
cd frontend
npm start
# Opens http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| GET    | /api/products       | Get all products (supports filters) |
| GET    | /api/products/:id   | Get single product                  |
| GET    | /api/categories     | Get all categories                  |
| POST   | /api/orders         | Place a new order                   |
| GET    | /api/orders         | Get all orders                      |
| GET    | /api/orders/:id     | Get single order by ID              |
| GET    | /api/health         | Health check                        |

### Filter Query Params for `/api/products`
- `?search=headphones` — search by name
- `?category=Electronics` — filter by category
- `?minPrice=500&maxPrice=2000` — price range filter

---

## 🔄 Order Status Flow

Orders automatically progress through statuses (simulated):
```
Placed (instant) → Shipped (after 15s) → Delivered (after 30s)
```
The Orders page **auto-refreshes every 5 seconds** so you can watch status update live.

---

## 📋 SRS Requirements Coverage

| SRS Requirement                  | Status |
|----------------------------------|--------|
| Display product listings          | ✅     |
| Search products by name           | ✅     |
| Filter by category & price range  | ✅     |
| Add/update/remove cart items      | ✅     |
| Display cart total                | ✅     |
| Place an order                    | ✅     |
| Generate unique order ID          | ✅     |
| Display order confirmation        | ✅     |
| View order history                | ✅     |
| Display order status              | ✅     |
| Simple intuitive UI               | ✅     |
| Session cart persistence          | ✅     |

---

## 💡 How to Extend

- **Add real database**: Replace in-memory arrays with MongoDB or SQLite
- **Add Auth**: Add JWT-based login/register pages
- **Real payments**: Integrate Razorpay or Stripe
- **Admin panel**: Add product management routes
- **Reviews**: Add a reviews model and rating component

---

*Built as part of Agile E-Commerce SRS project — 7-day development plan.*
