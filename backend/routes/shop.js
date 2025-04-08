
import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';
import { getUserCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
import { checkout, getUserOrders, getOrderDetails } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Product routes (no auth required)
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// Cart routes (require authentication)
router.get('/cart', authenticateUser, async (req, res) => {
  try {
    // Check if cart_items table exists
    const [tableCheck] = await req.db.promise().query(`
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = 'pet_clinic' AND table_name = 'cart_items'
    `);
    
    if (tableCheck[0].count === 0) {
      // If table doesn't exist, return empty cart
      return res.json([]);
    }
    
    // If table exists, proceed with normal cart operation
    return getUserCart(req, res);
  } catch (error) {
    console.error('Error checking cart table:', error);
    // Return empty cart as fallback
    return res.json([]);
  }
});

router.post('/cart/add', authenticateUser, async (req, res) => {
  try {
    // Check if necessary tables exist
    const [tablesCheck] = await req.db.promise().query(`
      SELECT 
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'pet_clinic' AND table_name = 'cart_items') as cart_exists,
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'pet_clinic' AND table_name = 'products') as products_exist
    `);
    
    if (tablesCheck[0].cart_exists === 0 || tablesCheck[0].products_exist === 0) {
      // If tables don't exist, return mock response
      return res.json({ success: true, message: 'Item added to cart (mock)' });
    }
    
    // If tables exist, proceed with normal operation
    return addToCart(req, res);
  } catch (error) {
    console.error('Error checking tables for add to cart:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.put('/cart/update', authenticateUser, updateCartItem);
router.delete('/cart/remove', authenticateUser, removeFromCart);

// Order routes (require authentication)
router.post('/checkout', authenticateUser, checkout);
router.get('/orders', authenticateUser, getUserOrders);
router.get('/orders/:id', authenticateUser, getOrderDetails);

export default router;
