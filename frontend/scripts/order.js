import { getOrder } from './api.js';

const statusEl = document.getElementById('status');

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('id');

async function refresh() {
  if (!orderId) {
    statusEl.textContent = 'Missing order id.';
    return;
  }
  const order = await getOrder(orderId);
  if (order && order.status) {
    statusEl.innerHTML = \`
      <p>Order ID: <strong>\${order._id}</strong></p>
      <p>Status: <strong>\${order.status}</strong></p>
      <p>Items:</p>
      <ul>\${order.items.map(i => '<li>'+i.name+' x '+i.quantity+'</li>').join('')}</ul>
    \`;
  } else {
    statusEl.textContent = 'Order not found.';
  }
}

setInterval(refresh, 4000);
refresh();
