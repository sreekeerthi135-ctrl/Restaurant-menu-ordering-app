import { fetchMenu, createMenuItem } from './api.js';

const list = document.getElementById('admin-menu');
const nameEl = document.getElementById('name');
const descEl = document.getElementById('description');
const priceEl = document.getElementById('price');
const catEl = document.getElementById('category');
const imgEl = document.getElementById('imageUrl');
const addBtn = document.getElementById('add-item');

async function load() {
  const items = await fetchMenu();
  list.innerHTML = items.map(i => \`
    <div class="card">
      <img src="\${i.imageUrl || 'https://via.placeholder.com/300x180?text='+encodeURIComponent(i.name)}" alt="\${i.name}"/>
      <h3>\${i.name}</h3>
      <p>\${i.category} • ₹\${i.price}</p>
    </div>
  \`).join('');
}

addBtn.addEventListener('click', async () => {
  const payload = {
    name: nameEl.value,
    description: descEl.value,
    price: Number(priceEl.value),
    category: catEl.value,
    imageUrl: imgEl.value
  };
  const res = await createMenuItem(payload);
  if (res && res._id) {
    nameEl.value = descEl.value = catEl.value = imgEl.value = '';
    priceEl.value = '';
    load();
    alert('Item added!');
  } else {
    alert('Failed to add item');
  }
});

load();
