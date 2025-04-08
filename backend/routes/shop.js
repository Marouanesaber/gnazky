
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
router.get('/cart', authenticateUser, getUserCart);
router.post('/cart/add', authenticateUser, addToCart);
router.put('/cart/update', authenticateUser, updateCartItem);
router.delete('/cart/remove', authenticateUser, removeFromCart);

// Order routes (require authentication)
router.post('/checkout', authenticateUser, checkout);
router.get('/orders', authenticateUser, getUserOrders);
router.get('/orders/:id', authenticateUser, getOrderDetails);

export default router;
