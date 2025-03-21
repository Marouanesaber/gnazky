
-- Schema for the pet_clinic database with user authentication

-- Drop database if exists and create a new one
DROP DATABASE IF EXISTS pet_clinic;
CREATE DATABASE pet_clinic;
USE pet_clinic;

-- Users table for authentication
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(1000),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Owners table
CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Vaccinations table
CREATE TABLE vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccine_name VARCHAR(100) NOT NULL,
  vaccine_brand VARCHAR(100),
  batch_number VARCHAR(100),
  administered_date DATE NOT NULL,
  administered_by VARCHAR(100),
  next_due_date DATE,
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Settings table for clinic settings
CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_name VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inventory table for clinic inventory
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(100) NOT NULL,
  item_type VARCHAR(50) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit VARCHAR(20),
  unit_price DECIMAL(10,2),
  reorder_level INT,
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Billing table for clinic billing
CREATE TABLE billing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  owner_id INT NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  service_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'unpaid',
  payment_method VARCHAR(50),
  payment_date DATETIME,
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
(4, '2023-07-25 15:00:00', '2023-07-25 15:45:00', 'Dental cleaning', 'scheduled', 'First dental procedure');

-- Insert sample data for consultations
INSERT INTO consultations (pet_id, consultation_date, symptoms, diagnosis, treatment, notes) VALUES
(1, '2023-07-15 10:15:00', 'Lethargy, reduced appetite', 'Mild infection', 'Prescribed antibiotics for 7 days', 'Follow-up in 2 weeks'),
(2, '2023-07-16 14:45:00', 'Excessive grooming, hair loss', 'Stress-induced alopecia', 'Environmental enrichment, pheromone diffuser', 'Monitor for 2 weeks');

-- Insert sample data for vaccinations
INSERT INTO vaccinations (pet_id, vaccine_name, administered_date, next_due_date, notes) VALUES
(1, 'DHPP', '2023-01-10', '2024-01-10', 'Annual vaccine'),
(1, 'Rabies', '2023-01-10', '2025-01-10', 'Three-year vaccine'),
(2, 'FVRCP', '2023-02-15', '2024-02-15', 'Annual vaccine'),
(3, 'DHPP', '2023-03-20', '2024-03-20', 'Annual vaccine');

-- Insert sample data for laboratory tests
INSERT INTO laboratory (pet_id, test_type, test_date, results, notes) VALUES
(1, 'Blood Panel', '2023-07-15', 'All values within normal range', 'Comprehensive health screening'),
(2, 'Urinalysis', '2023-07-16', 'Slightly elevated protein levels', 'Recommend follow-up in 3 months');

-- Insert sample data for surgeries
INSERT INTO surgery (pet_id, surgery_type, surgery_date, surgeon, notes) VALUES
(3, 'Dental Extraction', '2023-05-10', 'Dr. Martinez', 'Removed two fractured teeth'),
(4, 'Spay', '2022-10-05', 'Dr. Wilson', 'Routine procedure, no complications');

-- Sample admin user with hashed password (password is "admin123")
INSERT INTO users (name, email, password, profile_picture, role) VALUES
('Admin User', 'admin@petclinic.com', '$2b$10$DJA.DT.dLtVBu2sJYwa.0O3kKRfsCPVgSjC2YNKxvR92EKpVVhn.G', 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff', 'admin');

-- Sample clinic settings
INSERT INTO settings (setting_name, setting_value) VALUES
('clinic_name', 'Pet Health Clinic'),
('clinic_address', '123 Veterinary Lane, Animalville, AV 12345'),
('clinic_phone', '555-987-6543'),
('clinic_email', 'info@pethealthclinic.com'),
('clinic_hours', 'Monday-Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 3:00 PM, Sunday: Closed'),
('appointment_duration', '30');
