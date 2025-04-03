
-- New Pet Clinic Database Schema with all tables
-- This file includes all tables with proper indexes and sample data

DROP DATABASE IF EXISTS pet_clinic;
CREATE DATABASE pet_clinic;
USE pet_clinic;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin', 'vet', 'assistant', 'receptionist', 'owner') NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_picture VARCHAR(255),
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

-- Vaccinations table - fixed column names to avoid reserved words
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

-- Insert sample data for vaccinations with fixed column names
INSERT INTO vaccinations (pet_id, vaccination_date, vaccine_type, administered_by, temperature) VALUES
(1, '2023-01-10', 'DHPP', 'Dr. Smith', '38.5'),
(1, '2023-01-10', 'Rabies', 'Dr. Smith', '38.5'),
(2, '2023-02-15', 'FVRCP', 'Dr. Jones', '38.8'),
(3, '2023-03-20', 'DHPP', 'Dr. Smith', '38.3'),
(4, '2023-04-25', 'Rabies', 'Dr. Wilson', '38.6');

-- Insert sample data for laboratory tests
INSERT INTO laboratory (pet_id, test_type, test_date, results, notes) VALUES
(1, 'Blood Panel', '2023-07-15', 'All values within normal range', 'Comprehensive health screening'),
(2, 'Urinalysis', '2023-07-16', 'Slightly elevated protein levels', 'Recommend follow-up in 3 months');

-- Insert sample data for surgeries
INSERT INTO surgery (pet_id, surgery_type, surgery_date, surgeon, notes) VALUES
(3, 'Dental Extraction', '2023-05-10', 'Dr. Martinez', 'Removed two fractured teeth'),
(4, 'Spay', '2022-10-05', 'Dr. Wilson', 'Routine procedure, no complications');

-- Add dummy user for testing (password: password123)
INSERT INTO users (username, password, email, role, first_name, last_name) VALUES
('admin', '$2b$10$qL.VSdruKpwCJlQxHZOqXuCf8WVqgDW7QCtPsI6peCl2KSVXpLl2m', 'admin@petclinic.com', 'admin', 'Admin', 'User');
