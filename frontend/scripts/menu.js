import { fetchMenu } from './api.js';

const list = document.getElementById('menu-list');
const cartCount = document.getElementById('cart-count');
const categoryFilter = document.getElementById('category-filter');

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.menuItemId === item._id);
  if (existing) existing.quantity += 1;
  else cart.push({ menuItemId: item._id, name: item.name, unitPrice: item.price, quantity: 1 });
  setCart(cart);
}

async function loadMenu() {
  const category = categoryFilter.value;
  const items = await fetchMenu(category);
  list.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.imageUrl || 'https://via.placeholder.com/300x180?text='+encodeURIComponent(item.name)}" alt="${item.name}"/>
      <h3>${item.name}</h3>
      <p>${item.description || ''}</p>
      <div class="row">
        <strong>₹${item.price}</strong>
        <button class="btn" data-id="${item._id}">Add</button>
      </div>
    </div>
  `).join('');
  list.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items.find(i => i._id === btn.dataset.id);
      addToCart(item);
    });
  });
}

categoryFilter.addEventListener('change', loadMenu);
setCart(getCart());
loadMenu();
