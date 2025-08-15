# 🍔 Restaurant Menu Ordering App

A GitHub-ready, full-stack web app where customers can browse a digital menu, add to cart, place orders, and track status. 
Kitchen staff and admins can see orders and manage the menu in real-time.

## ✨ Features
- Customer: Menu browsing, cart, order placement, order tracking.
- Admin: Add menu items, see current menu.
- Real-time: Socket hooks present; polling used by default for simplicity.
- Tech: Node.js, Express, MongoDB, HTML/CSS/Vanilla JS.

## 🧱 Project Structure
```
restaurant-menu-ordering-app/
├── backend/          # Express server + MongoDB models & routes
└── frontend/         # HTML/CSS/JS client
```

## 🔧 Setup (Local)
1) **Backend**
```bash
cd backend
npm install
cp .env.example .env   # edit MONGO_URI if needed
npm run seed           # optional: add sample menu items
npm run dev            # or: npm start
```
Backend runs at `http://localhost:5000`.

2) **Frontend**
- Open `frontend/index.html` directly in your browser, or serve it with a simple static server.
- Ensure the backend is running. If your backend runs elsewhere, set it in localStorage:
  - Open DevTools Console on any frontend page and run:
    ```js
    localStorage.setItem('api_base','http://localhost:5000');
    ```

## 🧪 API Endpoints
- `GET /api/menu` — list menu items (optional `?category=Pizza` etc)
- `POST /api/menu` — add a menu item (no auth in demo; add in production)
- `POST /api/orders` — create new order
- `GET /api/orders/:id` — get order by id
- `PUT /api/orders/:id/status` — update order status (kitchen/admin)

## 📸 Screenshots (suggested)
- `frontend/menu.html` showing cards grid
- `frontend/cart.html` showing items + total
- `frontend/order.html?id=<id>` showing order status

## 🚀 Deploy
- **Backend**: Render/Railway/Heroku.
- **Frontend**: Netlify/Vercel/GitHub Pages (adjust `api_base` to your backend URL).

## 🛡️ Notes
- This demo has no authentication; add JWT & roles for production (Admin, Kitchen, Customer).
- Payments are not integrated; plug in Razorpay/Stripe at checkout.
- Socket.io client can be added for instant status updates.

## 📝 License
MIT
