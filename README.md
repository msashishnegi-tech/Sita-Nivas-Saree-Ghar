# 🛍️ LUXE Fashion - E-Commerce Clothing Store

A premium, world-class e-commerce website for clothing with Paytm QR Code payment integration.

## ✨ Features

- 🎨 **Stunning UI** - Modern, responsive design with animations & glass effects
- 👕 **Product Catalog** - Men, Women, Kids & Accessories with filters
- 🛒 **Shopping Cart** - Add/remove items, quantity management
- 💳 **Paytm QR Payment** - Scan & pay via UPI
- 📦 **Order Tracking** - Real-time order status updates
- 👤 **User Accounts** - Profile, addresses, order history
- 🔧 **Admin Dashboard** - Inventory management, order processing, analytics
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet & desktop

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Payment | Paytm QR Code (UPI) |
| Auth | JWT (JSON Web Tokens) |

## 📁 Project Structure

```
ecommerce-clothing/
├── frontend/              # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx       # Homepage (Hero, Categories, Products)
│   │   ├── products/      # Product listing & detail pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout with Paytm QR
│   │   ├── account/       # User account & order tracking
│   │   └── admin/         # Admin dashboard
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Footer.tsx     # Footer
│   │   └── ProductCard.tsx # Product card component
│   └── context/           # Cart context
├── backend/               # Express.js Backend
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication
│   │   ├── products.js    # Product APIs
│   │   ├── orders.js      # Order APIs
│   │   └── admin.js       # Admin APIs
│   └── server.js          # Entry point
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Update .env with your settings
# MONGODB_URI=mongodb://localhost:27017/ecommerce-clothing
# JWT_SECRET=your_secret_key
# PAYTM_MERCHANT_ID=your_paytm_id
# PAYTM_MERCHANT_KEY=your_paytm_key

npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 💳 Paytm QR Code Setup

1. Login to your Paytm Business account
2. Go to "Accept Payments" → "QR Code"
3. Download your merchant QR code
4. Place the QR image in `frontend/public/paytm-qr.png`
5. Update the checkout page to display your QR code

## 🎨 Design Highlights

- Gradient text effects
- Glass morphism navbar
- Card hover animations
- Smooth scroll transitions
- Floating animations
- Responsive grid layouts
- Custom scrollbar styling
- Pulse glow effects on cart badge

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero banner, categories, featured products |
| Products | `/products` | All products with filters & sorting |
| Product Detail | `/products/[id]` | Single product view with size/color selection |
| Cart | `/cart` | Shopping cart with quantity controls |
| Checkout | `/checkout` | Address + Paytm QR payment |
| Account | `/account` | Order tracking, profile, addresses |
| Admin | `/admin` | Dashboard, inventory, orders management |

## 🔐 Admin Access

Default admin credentials (change in production):
- Create admin user via backend API
- Access admin panel at `/admin`

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Railway/Render)
```bash
cd backend
# Set environment variables in platform dashboard
npm start
```

## 📄 License

MIT License - Free to use for personal and commercial projects.

---

Built with ❤️ by LUXE Fashion Team
