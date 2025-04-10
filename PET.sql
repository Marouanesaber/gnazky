
-- PET.sql - Consolidated Pet Clinic Database Schema

-- Create and select database
DROP DATABASE IF EXISTS pet_clinic;
CREATE DATABASE pet_clinic;
USE pet_clinic;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS shop_orders;
DROP TABLE IF EXISTS shop_cart_items;
DROP TABLE IF EXISTS shop_products;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS vaccinations;
DROP TABLE IF EXISTS surgeries;
DROP TABLE IF EXISTS lab_tests;
DROP TABLE IF EXISTS consultations;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS users;

-- Create Users table with enhanced authentication and role management
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin', 'vet', 'assistant', 'receptionist', 'owner', 'customer') NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

-- Create Staff table for veterinary professionals
CREATE TABLE staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  position VARCHAR(100) NOT NULL,
  specialty VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20),
  hire_date DATE NOT NULL,
  status ENUM('active', 'on_leave', 'terminated') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Owners table for pet owners
CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(50),
  state VARCHAR(50),
  postal_code VARCHAR(20),
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Pets table with comprehensive pet information
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(50),
  color VARCHAR(50),
  date_of_birth DATE,
  gender ENUM('male', 'female', 'unknown') NOT NULL,
  microchip_id VARCHAR(50),
  weight DECIMAL(5,2),
  weight_unit ENUM('kg', 'lb') DEFAULT 'kg',
  allergies TEXT,
  existing_conditions TEXT,
  notes TEXT,
  insurance_provider VARCHAR(100),
  insurance_policy_number VARCHAR(50),
  status ENUM('active', 'deceased', 'transferred') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Create Appointments table with extended functionality
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  owner_id INT NOT NULL,
  staff_id INT,
  appointment_date DATETIME NOT NULL,
  end_time DATETIME,
  duration INT DEFAULT 30,
  appointment_type ENUM('check_up', 'vaccination', 'surgery', 'consultation', 'emergency', 'follow_up', 'grooming') NOT NULL,
  reason TEXT,
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  doctor VARCHAR(100),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Consultations table
CREATE TABLE consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  staff_id INT NOT NULL,
  date_time DATETIME NOT NULL,
  reason_for_visit TEXT NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  follow_up_date DATE,
  status ENUM('scheduled', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Create Lab Tests table
CREATE TABLE lab_tests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consultation_id INT,
  pet_id INT NOT NULL,
  staff_id INT NOT NULL,
  test_type VARCHAR(100) NOT NULL,
  date_time DATETIME NOT NULL,
  results TEXT,
  notes TEXT,
  status ENUM('ordered', 'in_progress', 'completed', 'cancelled') DEFAULT 'ordered',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE SET NULL,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Create Surgeries table
CREATE TABLE surgeries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  lead_surgeon_id INT NOT NULL,
  assistant_id INT,
  surgery_type VARCHAR(100) NOT NULL,
  date_time DATETIME NOT NULL,
  duration INT,
  anesthesia VARCHAR(100),
  description TEXT,
  complications TEXT,
  post_op_instructions TEXT,
  status ENUM('scheduled', 'completed', 'cancelled', 'postponed') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (lead_surgeon_id) REFERENCES staff(id) ON DELETE CASCADE,
  FOREIGN KEY (assistant_id) REFERENCES staff(id) ON DELETE SET NULL
);

-- Create Vaccinations table
CREATE TABLE vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  staff_id INT NOT NULL,
  vaccine_name VARCHAR(100) NOT NULL,
  date_administered DATE NOT NULL,
  vaccine_lot_number VARCHAR(50),
  manufacturer VARCHAR(100),
  expiration_date DATE,
  next_due_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Create Shop Products table
CREATE TABLE shop_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  stock_quantity INT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Shop Cart Items table
CREATE TABLE shop_cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES shop_products(id) ON DELETE CASCADE
);

-- Create Shop Orders table
CREATE TABLE shop_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample initial data insertion
INSERT INTO users (username, password, email, role, first_name, last_name) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@petclinic.com', 'admin', 'Admin', 'User');

-- Add indexes for performance optimization
CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_appointments_pet_id ON appointments(pet_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_vaccinations_pet_id ON vaccinations(pet_id);
CREATE INDEX idx_lab_tests_pet_id ON lab_tests(pet_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
