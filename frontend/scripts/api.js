const API_BASE = (localStorage.getItem('api_base') || 'http://localhost:5000');

export async function fetchMenu(category = '') {
  const url = category ? `${API_BASE}/api/menu?category=${encodeURIComponent(category)}` : `${API_BASE}/api/menu`;
  const res = await fetch(url);
  return res.json();
}

export async function createMenuItem(item) {
  const res = await fetch(`${API_BASE}/api/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return res.json();
}

export async function getOrder(id) {
  const res = await fetch(`${API_BASE}/api/orders/${id}`);
  return res.json();
}
