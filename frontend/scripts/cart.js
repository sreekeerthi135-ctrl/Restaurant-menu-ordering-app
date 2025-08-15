import { createOrder } from './api.js';

const itemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total-amount');
const resultEl = document.getElementById('order-result');
const nameEl = document.getElementById('customer-name');
const tableEl = document.getElementById('table-number');
const placeBtn = document.getElementById('place-order');

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p>Your cart is empty.</p>';
    totalEl.textContent = '0';
    return;
  }
  itemsEl.innerHTML = cart.map((c, idx) => `
    <div class="cart-item">
      <div>${c.name} x ${c.quantity}</div>
      <div>₹${c.unitPrice * c.quantity}</div>
    </div>
  `).join('');
  const total = cart.reduce((sum, c) => sum + c.unitPrice * c.quantity, 0);
  totalEl.textContent = total;
}

async function placeOrder() {
  const cart = getCart();
  if (cart.length === 0) return;
  const payload = {
    items: cart,
    totalAmount: cart.reduce((sum, c) => sum + c.unitPrice * c.quantity, 0),
    customerName: nameEl.value || 'Guest',
    tableNumber: tableEl.value || ''
  };
  const order = await createOrder(payload);
  if (order && order._id) {
    setCart([]);
    renderCart();
    resultEl.innerHTML = \`<p>Order placed! ID: <strong>\${order._id}</strong></p>
      <p><a class="btn" href="order.html?id=\${order._id}">Track Order</a></p>\`;
  } else {
    resultEl.textContent = 'Failed to place order.';
  }
}

placeBtn.addEventListener('click', placeOrder);
renderCart();
