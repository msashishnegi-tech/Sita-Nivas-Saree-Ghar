const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Check authentication
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const productsPath = path.join(process.cwd(), 'static-site', 'products.json');
  
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    if (req.method === 'GET') {
      // Get all products
      res.status(200).json(products);
    } 
    else if (req.method === 'POST') {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      products.push(newProduct);
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
      res.status(201).json({ success: true, product: newProduct });
    } 
    else if (req.method === 'PUT') {
      // Update product
      const { id, ...updates } = req.body;
      const index = products.findIndex(p => p.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      products[index] = { ...products[index], ...updates };
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
      res.status(200).json({ success: true, product: products[index] });
    } 
    else if (req.method === 'DELETE') {
      // Delete product
      const { id } = req.query;
      const filtered = products.filter(p => p.id !== id);
      if (filtered.length === products.length) {
        return res.status(404).json({ error: 'Product not found' });
      }
      fs.writeFileSync(productsPath, JSON.stringify(filtered, null, 2));
      res.status(200).json({ success: true, message: 'Product deleted' });
    } 
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request' });
  }
};
