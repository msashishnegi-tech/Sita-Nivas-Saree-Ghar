const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const productsPath = path.join(process.cwd(), 'static-site', 'products.json');
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
