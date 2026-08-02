const DEFAULT_PRODUCTS = [
  { id: "1", name: "Premium Silk Kurta", price: 2999, salePrice: 1999, category: "men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", description: "Premium quality silk kurta with elegant design", stock: 50, createdAt: "2026-07-22T00:00:00Z" },
  { id: "2", name: "Floral Maxi Dress", price: 3499, salePrice: 2499, category: "women", image: "https://images.unsplash.com/photo-1572804013309-59a88a7e9b60?w=500", description: "Beautiful floral print maxi dress", stock: 30, createdAt: "2026-07-22T00:00:00Z" },
  { id: "3", name: "Denim Jacket Classic", price: 4999, salePrice: 3499, category: "men", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", description: "Classic denim jacket for all seasons", stock: 25, createdAt: "2026-07-22T00:00:00Z" },
  { id: "4", name: "Designer Lehenga Set", price: 8999, salePrice: 6999, category: "women", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500", description: "Elegant designer lehenga for special occasions", stock: 15, createdAt: "2026-07-22T00:00:00Z" }
];

let products = [...DEFAULT_PRODUCTS];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) { const p = products.find(p => p.id === id); if (!p) return res.status(404).json({ error: 'Not found' }); return res.json(p); }
    res.json(products);
  } else if (req.method === 'POST') {
    const np = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
    np.price = Number(np.price); if (np.salePrice) np.salePrice = Number(np.salePrice); np.stock = Number(np.stock) || 0;
    products.push(np); res.status(201).json({ success: true, product: np });
  } else if (req.method === 'PUT') {
    const { id } = req.query; if (!id) return res.status(400).json({ error: 'ID required' });
    const idx = products.findIndex(p => p.id === id); if (idx === -1) return res.status(404).json({ error: 'Not found' });
    const u = { ...req.body }; delete u.id;
    if (u.price) u.price = Number(u.price); if (u.salePrice) u.salePrice = Number(u.salePrice); if (u.stock !== undefined) u.stock = Number(u.stock);
    products[idx] = { ...products[idx], ...u }; res.json({ success: true, product: products[idx] });
  } else if (req.method === 'DELETE') {
    const { id } = req.query; if (!id) return res.status(400).json({ error: 'ID required' });
    const f = products.filter(p => p.id !== id); if (f.length === products.length) return res.status(404).json({ error: 'Not found' });
    products = f; res.json({ success: true });
  } else { res.status(405).json({ error: 'Method not allowed' }); }
};
