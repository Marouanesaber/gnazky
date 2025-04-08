
-- Pet Clinic Database Schema - Consolidated Version

-- Drop database if exists and create a new one
DROP DATABASE IF EXISTS pet_clinic;
CREATE DATABASE pet_clinic;
USE pet_clinic;

-- Users table for authentication
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(20) DEFAULT 'user',
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_picture MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);

-- Owners table
CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pets table
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(100),
  age INT,
  weight DECIMAL(5,2),
  gender VARCHAR(10),
  color VARCHAR(50),
  microchip_id VARCHAR(100),
  owner_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  end_time DATETIME,
  reason VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Consultations table
CREATE TABLE consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  consultation_date DATETIME NOT NULL,
  symptoms TEXT,
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Vaccinations table
CREATE TABLE vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccination_date DATE NOT NULL,
  vaccine_type VARCHAR(100) NOT NULL,
  administered_by VARCHAR(100) NOT NULL,
  temperature VARCHAR(20) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Laboratory tests table
CREATE TABLE laboratory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  test_type VARCHAR(100) NOT NULL,
  test_date DATE NOT NULL,
  sample_type VARCHAR(100),
  results TEXT,
  reference_range TEXT,
  interpretation TEXT,
  performed_by VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Surgeries table
CREATE TABLE surgery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  surgery_type VARCHAR(100) NOT NULL,
  surgery_date DATE NOT NULL,
  pre_op_exam TEXT,
  anesthesia_used TEXT,
  procedure_details TEXT,
  complications TEXT,
  post_op_care TEXT,
  surgeon VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Product Categories
CREATE TABLE product_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
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
CREATE TABLE cart_items (
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
CREATE TABLE orders (
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
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data for owners
INSERT INTO owners (name, email, phone, address) VALUES
('John Smith', 'john@example.com', '555-123-4567', '123 Main St, City'),
('Emily Johnson', 'emily@example.com', '555-234-5678', '456 Oak Ave, Town'),
('Michael Brown', 'michael@example.com', '555-345-6789', '789 Pine Rd, Village');

-- Insert sample data for pets
INSERT INTO pets (name, species, breed, age, gender, owner_id) VALUES
('Max', 'Dog', 'Golden Retriever', 3, 'Male', 1),
('Bella', 'Cat', 'Siamese', 2, 'Female', 1),
('Charlie', 'Dog', 'Beagle', 5, 'Male', 2),
('Lucy', 'Cat', 'Persian', 4, 'Female', 3);

-- Insert sample data for appointments
INSERT INTO appointments (pet_id, appointment_date, end_time, reason, status, notes) VALUES
(1, '2023-07-15 10:00:00', '2023-07-15 10:30:00', 'Annual checkup', 'completed', 'Routine examination'),
(2, '2023-07-16 14:30:00', '2023-07-16 15:00:00', 'Vaccination', 'completed', 'Rabies vaccine'),
(3, '2023-07-20 11:00:00', '2023-07-20 11:30:00', 'Skin issue', 'scheduled', 'Recurring rash'),
(4, '2023-07-25 15:00:00', '2023-07-25 15:45:00', 'Dental cleaning', 'scheduled', 'First dental procedure'),
(1, CURRENT_DATE(), DATE_ADD(CURRENT_DATE(), INTERVAL 1 HOUR), 'Follow-up visit', 'scheduled', 'Check progress');

-- Insert sample data for vaccinations
INSERT INTO vaccinations (pet_id, vaccination_date, vaccine_type, administered_by, temperature) VALUES
(1, '2023-01-10', 'DHPP', 'Dr. Smith', '38.5'),
(1, '2023-01-10', 'Rabies', 'Dr. Smith', '38.5'),
(2, '2023-02-15', 'FVRCP', 'Dr. Jones', '38.8'),
(3, '2023-03-20', 'DHPP', 'Dr. Smith', '38.3'),
(4, '2023-04-25', 'Rabies', 'Dr. Wilson', '38.6');

-- Insert sample admin user (password: admin123)
INSERT INTO users (username, password, email, role, first_name, last_name) VALUES
('admin', '$2b$10$DJA.DT.dLtVBu2sJYwa.0O3kKRfsCPVgSjC2YNKxvR92EKpVVhn.G', 'admin@petclinic.com', 'admin', 'Admin', 'User');

-- Insert default product categories
INSERT INTO product_categories (name, description) VALUES
('Pet Food', 'Nutritional food products for all pets'),
('Toys', 'Fun and entertaining toys for pets'),
('Medicine', 'Healthcare and medical products'),
('Accessories', 'Essential accessories for pets'),
('Grooming', 'Products for pet grooming and hygiene');

-- Insert sample products
INSERT INTO products (category_id, name, description, price, stock, image) VALUES
(1, 'Premium Dog Food', 'High-quality nutrition for adult dogs with all natural ingredients', 29.99, 50, 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
(4, 'Cat Scratching Post', 'Durable scratching post with soft perch for lounging', 39.99, 25, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0JTIwdG95fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'),
(5, 'Pet Shampoo', 'Gentle formula for all pets with sensitive skin', 12.99, 100, 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGV0JTIwc2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
(2, 'Interactive Dog Toy', 'Keeps dogs entertained for hours with treat dispensing feature', 15.99, 35, 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZyUyMHRveXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
(1, 'Cat Dental Treats', 'Helps maintain dental health while tasting delicious', 8.99, 80, 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwdHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'),
(3, 'Flea and Tick Medicine', 'Monthly treatment for pets to prevent parasites', 45.99, 40, 'https://images.unsplash.com/photo-1512237798647-84b57b22b517?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwbWVkaWNpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60');
