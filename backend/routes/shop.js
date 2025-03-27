
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

// Get all products
router.get('/products', async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT p.*, pc.name as category
      FROM products p
      JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.is_active = TRUE
      ORDER BY p.created_at DESC
    `);
    
    // Format data for frontend
    const products = rows.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image: product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`,
      category: product.category,
      stock: product.stock
    }));
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT p.*, pc.name as category 
      FROM products p
      JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.id = ? AND p.is_active = TRUE
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = rows[0];
    
    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image: product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`,
      category: product.category,
      stock: product.stock,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get user's cart
router.get('/cart', authenticateUser, async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.description, p.price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [req.user.id]);
    
    const cartItems = rows.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product_id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        image: item.image || `https://placehold.co/300x300?text=${encodeURIComponent(item.name)}`,
        stock: item.stock
      }
    }));
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/cart/add', authenticateUser, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  
  try {
    // Check if product exists and has stock
    const [productRows] = await req.db.promise().query(
      'SELECT id, stock FROM products WHERE id = ? AND is_active = TRUE',
      [productId]
    );
    
    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (productRows[0].stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }
    
    // Check if item is already in cart
    const [cartRows] = await req.db.promise().query(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    );
    
    if (cartRows.length > 0) {
      // Update quantity if item already in cart
      const newQuantity = cartRows[0].quantity + quantity;
      
      if (newQuantity > productRows[0].stock) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      
      await req.db.promise().query(
        'UPDATE cart_items SET quantity = ?, updated_at = NOW() WHERE id = ?',
        [newQuantity, cartRows[0].id]
      );
    } else {
      // Add new item to cart
      await req.db.promise().query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [req.user.id, productId, quantity]
      );
    }
    
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.put('/cart/update', authenticateUser, async (req, res) => {
  const { itemId, quantity } = req.body;
  
  if (!itemId || !quantity) {
    return res.status(400).json({ error: 'Item ID and quantity are required' });
  }
  
  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  
  try {
    // Check if cart item exists and belongs to user
    const [cartRows] = await req.db.promise().query(
      'SELECT ci.id, ci.product_id, p.stock FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.id = ? AND ci.user_id = ?',
      [itemId, req.user.id]
    );
    
    if (cartRows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    if (quantity > cartRows[0].stock) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }
    
    // Update quantity
    await req.db.promise().query(
      'UPDATE cart_items SET quantity = ?, updated_at = NOW() WHERE id = ?',
      [quantity, itemId]
    );
    
    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove item from cart
router.delete('/cart/remove', authenticateUser, async (req, res) => {
  const { itemId } = req.body;
  
  if (!itemId) {
    return res.status(400).json({ error: 'Item ID is required' });
  }
  
  try {
    // Check if cart item exists and belongs to user
    const [cartRows] = await req.db.promise().query(
      'SELECT id FROM cart_items WHERE id = ? AND user_id = ?',
      [itemId, req.user.id]
    );
    
    if (cartRows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Remove item
    await req.db.promise().query(
      'DELETE FROM cart_items WHERE id = ?',
      [itemId]
    );
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Checkout
router.post('/checkout', authenticateUser, async (req, res) => {
  const { shippingAddress, billingAddress, paymentMethod } = req.body;
  
  try {
    // Get cart items
    const [cartItems] = await req.db.promise().query(`
      SELECT ci.id, ci.product_id, ci.quantity, p.price, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [req.user.id]);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Check stock availability
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        return res.status(400).json({ 
          error: 'Not enough stock available for some items',
          itemId: item.product_id
        });
      }
    }
    
    // Calculate totals
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += parseFloat(item.price) * item.quantity;
    }
    
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + tax + shipping;
    
    // Create order
    const connection = await req.db.promise().getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert order
      const [orderResult] = await connection.query(`
        INSERT INTO orders (
          user_id, subtotal, tax, shipping, total,
          shipping_address, billing_address, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        req.user.id, subtotal, tax, shipping, total,
        shippingAddress || '', billingAddress || '', paymentMethod || 'credit_card'
      ]);
      
      const orderId = orderResult.insertId;
      
      // Insert order items and update product stock
      for (const item of cartItems) {
        // Add to order items
        await connection.query(`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `, [orderId, item.product_id, item.quantity, item.price]);
        
        // Update product stock
        await connection.query(`
          UPDATE products SET stock = stock - ? WHERE id = ?
        `, [item.quantity, item.product_id]);
      }
      
      // Clear cart
      await connection.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
      
      await connection.commit();
      
      res.status(201).json({
        orderId,
        message: 'Order placed successfully',
        total
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

// Get user's orders
router.get('/orders', authenticateUser, async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT o.*, COUNT(oi.id) as item_count
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.user.id]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order details
router.get('/orders/:id', authenticateUser, async (req, res) => {
  try {
    const [orderRows] = await req.db.promise().query(`
      SELECT * FROM orders 
      WHERE id = ? AND user_id = ?
    `, [req.params.id, req.user.id]);
    
    if (orderRows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const order = orderRows[0];
    
    const [itemRows] = await req.db.promise().query(`
      SELECT oi.*, p.name, p.image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [req.params.id]);
    
    const items = itemRows.map(item => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      image: item.image || `https://placehold.co/300x300?text=${encodeURIComponent(item.name)}`,
      quantity: item.quantity,
      price: parseFloat(item.price),
      total: parseFloat(item.price) * item.quantity
    }));
    
    res.json({
      ...order,
      items
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

export default router;
