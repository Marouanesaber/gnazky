
// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // First check if product_categories table exists
    const [tableCheck] = await req.db.promise().query(`
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = 'pet_clinic' AND table_name = 'product_categories'
    `);
    
    if (tableCheck[0].count === 0) {
      // If table doesn't exist, return mock data
      return res.json([
        {
          id: 1,
          name: "Premium Dog Food",
          description: "High-quality nutrition for adult dogs",
          price: 29.99,
          image: "https://placehold.co/300x300?text=Dog+Food",
          category: "Food",
          stock: 50
        },
        {
          id: 2,
          name: "Cat Scratching Post",
          description: "Durable scratching post with soft perch",
          price: 39.99,
          image: "https://placehold.co/300x300?text=Scratching+Post", 
          category: "Accessories",
          stock: 25
        },
        {
          id: 3,
          name: "Pet Shampoo",
          description: "Gentle formula for all pets",
          price: 12.99,
          image: "https://placehold.co/300x300?text=Pet+Shampoo",
          category: "Grooming",
          stock: 100
        }
      ]);
    }
    
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
    // Return mock data as fallback
    res.json([
      {
        id: 1,
        name: "Premium Dog Food",
        description: "High-quality nutrition for adult dogs",
        price: 29.99,
        image: "https://placehold.co/300x300?text=Dog+Food",
        category: "Food",
        stock: 50
      },
      {
        id: 2,
        name: "Cat Scratching Post",
        description: "Durable scratching post with soft perch",
        price: 39.99,
        image: "https://placehold.co/300x300?text=Scratching+Post", 
        category: "Accessories",
        stock: 25
      },
      {
        id: 3,
        name: "Pet Shampoo",
        description: "Gentle formula for all pets",
        price: 12.99,
        image: "https://placehold.co/300x300?text=Pet+Shampoo",
        category: "Grooming",
        stock: 100
      }
    ]);
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    // Check if product_categories table exists
    const [tableCheck] = await req.db.promise().query(`
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = 'pet_clinic' AND table_name = 'product_categories'
    `);
    
    if (tableCheck[0].count === 0) {
      // If table doesn't exist, return mock data
      const mockProducts = [
        {
          id: 1,
          name: "Premium Dog Food",
          description: "High-quality nutrition for adult dogs",
          price: 29.99,
          image: "https://placehold.co/300x300?text=Dog+Food",
          category: "Food",
          stock: 50
        },
        {
          id: 2,
          name: "Cat Scratching Post",
          description: "Durable scratching post with soft perch",
          price: 39.99,
          image: "https://placehold.co/300x300?text=Scratching+Post", 
          category: "Accessories",
          stock: 25
        }
      ];
      
      const mockProduct = mockProducts.find(p => p.id === parseInt(req.params.id));
      
      if (!mockProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      return res.json(mockProduct);
    }
    
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
};
