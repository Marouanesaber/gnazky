
-- tables-owners-pets.sql - Owner and pet related tables

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
  registration_date DATE NOT NULL DEFAULT (CURRENT_DATE),
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

-- Add indexes for pets
CREATE INDEX idx_pets_owner_id ON pets(owner_id);
