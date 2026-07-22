const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

// Auth Middleware
function authMiddleware(req, res, next) {
  const jwt = require('jsonwebtoken');
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Create Order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Validate stock and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const price = product.salePrice || product.price;
      totalAmount += price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price,
        size: item.size,
        color: item.color,
        image: product.images[0]
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const shippingCharges = totalAmount >= 999 ? 0 : 99;
    const finalAmount = totalAmount + shippingCharges;

    const order = new Order({
      user: req.userId,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'paytm',
      totalAmount: finalAmount,
      shippingCharges,
      notes
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      paymentAmount: finalAmount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price');
    
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Check if user owns this order or is admin
    if (order.user.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Paytm Payment Confirmation (QR Code based)
router.post('/payment/confirm', authMiddleware, async (req, res) => {
  try {
    const { orderId, transactionId, paymentAmount } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // In real scenario, verify with Paytm API
    // For now, mark as paid on confirmation
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.transactionId = transactionId;
    await order.save();

    res.json({ message: 'Payment confirmed', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
