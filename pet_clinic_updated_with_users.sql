
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Owners table
CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pets table
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  owner_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  reason VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Vaccinations table
CREATE TABLE vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccine_name VARCHAR(100) NOT NULL,
  administered_date DATE NOT NULL,
  next_due_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Laboratory tests table
CREATE TABLE laboratory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  test_type VARCHAR(100) NOT NULL,
  test_date DATE NOT NULL,
  results TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Surgeries table
CREATE TABLE surgery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  surgery_type VARCHAR(100) NOT NULL,
  surgery_date DATE NOT NULL,
  surgeon VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO appointments (pet_id, appointment_date, reason, status, notes) VALUES
(1, '2023-07-15 10:00:00', 'Annual checkup', 'completed', 'Routine examination'),
(2, '2023-07-16 14:30:00', 'Vaccination', 'completed', 'Rabies vaccine'),
(3, '2023-07-20 11:00:00', 'Skin issue', 'scheduled', 'Recurring rash'),
(4, '2023-07-25 15:00:00', 'Dental cleaning', 'scheduled', 'First dental procedure');

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
INSERT INTO users (name, email, password, profile_picture) VALUES
('Admin User', 'admin@petclinic.com', '$2b$10$DJA.DT.dLtVBu2sJYwa.0O3kKRfsCPVgSjC2YNKxvR92EKpVVhn.G', 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff');
