const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let orders = await kv.get('orders');
    if (!orders) orders = [];

    if (req.method === 'GET') {
      res.status(200).json(orders);
    } else if (req.method === 'POST') {
      const newOrder = { ...req.body, createdAt: new Date().toISOString() };
      orders.unshift(newOrder);
      await kv.set('orders', orders);
      res.status(201).json({ success: true, order: newOrder });
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const index = orders.findIndex(o => o.orderId === id || o.id === id);
      if (index === -1) return res.status(404).json({ error: 'Order not found' });
      orders[index] = { ...orders[index], ...req.body };
      await kv.set('orders', orders);
      res.status(200).json({ success: true, order: orders[index] });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
