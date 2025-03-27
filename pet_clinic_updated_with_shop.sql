
-- Add shop-related tables to existing pet_clinic database

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  sku VARCHAR(50),
  image VARCHAR(255),
  weight DECIMAL(8, 2),
  dimensions VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES product_categories(id)
);

-- Cart items
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  shipping_address TEXT,
  billing_address TEXT,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert default product categories
INSERT IGNORE INTO product_categories (id, name, description) VALUES
(1, 'Pet Food', 'Nutritional food products for all pets'),
(2, 'Toys', 'Fun and entertaining toys for pets'),
(3, 'Medicine', 'Healthcare and medical products'),
(4, 'Accessories', 'Essential accessories for pets'),
(5, 'Grooming', 'Products for pet grooming and hygiene');

-- Insert sample products
INSERT IGNORE INTO products (category_id, name, description, price, stock, image) VALUES
(1, 'Premium Dog Food', 'High-quality nutrition for adult dogs with all natural ingredients', 29.99, 50, 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
(4, 'Cat Scratching Post', 'Durable scratching post with soft perch for lounging', 39.99, 25, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0JTIwdG95fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'),
(5, 'Pet Shampoo', 'Gentle formula for all pets with sensitive skin', 12.99, 100, 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGV0JTIwc2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
(2, 'Interactive Dog Toy', 'Keeps dogs entertained for hours with treat dispensing feature', 15.99, 35, 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZyUyMHRveXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
(1, 'Cat Dental Treats', 'Helps maintain dental health while tasting delicious', 8.99, 80, 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwdHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'),
(3, 'Flea and Tick Medicine', 'Monthly treatment for pets to prevent parasites', 45.99, 40, 'https://images.unsplash.com/photo-1512237798647-84b57b22b517?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwbWVkaWNpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'),
(4, 'Bird Cage Deluxe', 'Spacious cage for small to medium birds with multiple perches', 89.99, 15, 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyZCUyMGNhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'),
(4, 'Aquarium Starter Kit', 'Complete setup for beginners including tank, filter, and lights', 129.99, 10, 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXF1YXJpdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'),
(5, 'Pet Grooming Brush', 'Self-cleaning brush for removing loose fur from cats and dogs', 19.99, 60, 'https://images.unsplash.com/photo-1594026336890-869318692c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGV0JTIwYnJ1c2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'),
(4, 'Puppy Training Pads', 'Super absorbent pads for house training puppies', 24.99, 75, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60');
