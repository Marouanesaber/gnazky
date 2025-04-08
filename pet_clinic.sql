
-- Complete schema for pet_clinic database

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS pet_clinic;
USE pet_clinic;

-- Owners table
CREATE TABLE IF NOT EXISTS owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(200) NULL,
  city VARCHAR(50) NULL,
  state VARCHAR(50) NULL,
  postal_code VARCHAR(15) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  owner_id INT,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(50) NULL,
  color VARCHAR(50) NULL,
  date_of_birth DATE NULL,
  gender ENUM('Male', 'Female', 'Unknown') DEFAULT 'Unknown',
  weight DECIMAL(5,2) NULL,
  microchip_id VARCHAR(50) NULL,
  status ENUM('Active', 'Deceased', 'Adopted', 'Transferred') DEFAULT 'Active',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE SET NULL
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  end_time VARCHAR(5) NULL,
  reason VARCHAR(100) NOT NULL,
  notes TEXT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  doctor VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) NULL,
  role ENUM('admin', 'vet', 'staff', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  appointment_id INT NULL,
  consultation_date DATETIME NOT NULL,
  vet_id INT NULL,
  symptoms TEXT NULL,
  diagnosis TEXT NULL,
  treatment TEXT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Vaccinations table
CREATE TABLE IF NOT EXISTS vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccine_name VARCHAR(100) NOT NULL,
  vaccine_date DATE NOT NULL,
  expiry_date DATE NULL,
  manufacturer VARCHAR(100) NULL,
  batch_number VARCHAR(50) NULL,
  administered_by VARCHAR(100) NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Laboratory tests table
CREATE TABLE IF NOT EXISTS laboratory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  test_date DATE NOT NULL,
  test_type VARCHAR(100) NOT NULL,
  results TEXT NULL,
  normal_range VARCHAR(100) NULL,
  lab_name VARCHAR(100) NULL,
  result_date DATE NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Surgeries table
CREATE TABLE IF NOT EXISTS surgery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  procedure_name VARCHAR(100) NOT NULL,
  procedure_date DATE NOT NULL,
  surgeon VARCHAR(100) NULL,
  anesthesia VARCHAR(100) NULL,
  duration INT NULL, -- in minutes
  complications TEXT NULL,
  recovery_notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Shop tables
CREATE TABLE IF NOT EXISTS product_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255) NULL,
  category_id INT NULL,
  stock INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT NULL,
  payment_method VARCHAR(50) NULL,
  notes TEXT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample data for testing
INSERT INTO owners (first_name, last_name, email, phone, address, city, state, postal_code) VALUES
('John', 'Smith', 'john@example.com', '555-123-4567', '123 Main St', 'Anytown', 'CA', '12345'),
('Sarah', 'Johnson', 'sarah@example.com', '555-234-5678', '456 Oak Ave', 'Somewhere', 'NY', '67890'),
('Michael', 'Williams', 'michael@example.com', '555-345-6789', '789 Pine Rd', 'Nowhere', 'TX', '54321');

INSERT INTO pets (name, owner_id, species, breed, color, date_of_birth, gender, weight) VALUES
('Max', 1, 'Dog', 'Golden Retriever', 'Golden', '2018-03-15', 'Male', 32.5),
('Luna', 2, 'Cat', 'Siamese', 'Cream', '2019-07-20', 'Female', 4.2),
('Bella', 3, 'Dog', 'German Shepherd', 'Black and Tan', '2017-11-08', 'Female', 28.7),
('Rocky', 1, 'Dog', 'Bulldog', 'White', '2020-01-05', 'Male', 24.0);

INSERT INTO users (username, first_name, last_name, email, password, role) VALUES
('admin', 'Admin', 'User', 'admin@petclinic.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9wVTWmHUJRMoAaLJQRe/2o0oIkcW6Q2', 'admin'),
('vet', 'Vet', 'User', 'vet@petclinic.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9wVTWmHUJRMoAaLJQRe/2o0oIkcW6Q2', 'vet'),
('user', 'Regular', 'User', 'user@petclinic.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9wVTWmHUJRMoAaLJQRe/2o0oIkcW6Q2', 'user');

INSERT INTO appointments (pet_id, appointment_date, end_time, reason, status, doctor) VALUES
(1, '2023-10-15 10:00:00', '10:30', 'Vaccination', 'confirmed', 'Dr. Sarah Johnson'),
(2, '2023-10-16 14:30:00', '15:00', 'Checkup', 'pending', 'Dr. Michael Chen'),
(3, '2023-10-18 09:15:00', '09:45', 'Illness', 'completed', 'Dr. Sarah Johnson'),
(4, '2023-10-20 16:00:00', '16:30', 'Dental', 'cancelled', 'Dr. James Wilson'),
(1, '2023-10-22 11:30:00', '12:00', 'Surgery', 'confirmed', 'Dr. Emily Rodriguez');

INSERT INTO vaccinations (pet_id, vaccine_name, vaccine_date, expiry_date, manufacturer, administered_by) VALUES
(1, 'Rabies', '2022-05-10', '2023-05-10', 'VetPharm', 'Dr. Johnson'),
(1, 'DHPP', '2022-05-10', '2023-05-10', 'PetVaccines', 'Dr. Johnson'),
(2, 'FVRCP', '2022-06-15', '2023-06-15', 'CatHealth', 'Dr. Smith'),
(3, 'Rabies', '2022-04-20', '2023-04-20', 'VetPharm', 'Dr. Brown'),
(3, 'Leptospirosis', '2022-04-20', '2023-04-20', 'DogVaccine', 'Dr. Brown');

-- Insert product categories
INSERT INTO product_categories (name, description) VALUES 
('Food', 'High quality pet food'),
('Toys', 'Interactive toys for pets'),
('Accessories', 'Collars, leashes, and more'),
('Health', 'Health supplements and medicine');

-- Insert products
INSERT INTO products (name, description, price, category_id, stock, is_active) VALUES
('Premium Dog Food', 'High-quality nutrition for your dog', 39.99, 1, 50, TRUE),
('Cat Treats', 'Delicious treats your cat will love', 9.99, 1, 100, TRUE),
('Interactive Ball', 'Keeps your pet entertained for hours', 14.99, 2, 30, TRUE),
('Adjustable Collar', 'Comfortable collar for all breeds', 19.99, 3, 45, TRUE),
('Digestive Supplement', 'Supports healthy digestion', 24.99, 4, 25, TRUE);
