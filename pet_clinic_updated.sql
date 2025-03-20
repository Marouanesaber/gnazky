
-- Updated SQL File for PetClinic Application

-- Drop tables if they exist
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS vaccines;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS prescriptions;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS veterinarians;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin', 'vet', 'assistant', 'client') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);

-- Create Owners table
CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(50),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Veterinarians table
CREATE TABLE veterinarians (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  specialization VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  license_number VARCHAR(50) NOT NULL,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Pets table
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  species ENUM('Dog', 'Cat', 'Bird', 'Rabbit', 'Other') NOT NULL,
  breed VARCHAR(50),
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Unknown') NOT NULL,
  microchip_id VARCHAR(50),
  owner_id INT NOT NULL,
  status ENUM('Active', 'Inactive', 'Deceased') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Create Appointments table
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vet_id INT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reason VARCHAR(255) NOT NULL,
  status ENUM('Scheduled', 'Completed', 'Cancelled', 'No-show') DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (vet_id) REFERENCES veterinarians(id) ON DELETE SET NULL
);

-- Create Medical Records table
CREATE TABLE medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vet_id INT,
  visit_date DATE NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  weight DECIMAL(5,2),
  temperature DECIMAL(4,1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (vet_id) REFERENCES veterinarians(id) ON DELETE SET NULL
);

-- Create Vaccines table
CREATE TABLE vaccines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccine_name VARCHAR(100) NOT NULL,
  administered_date DATE NOT NULL,
  expiration_date DATE,
  administered_by INT,
  lot_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (administered_by) REFERENCES veterinarians(id) ON DELETE SET NULL
);

-- Create Prescriptions table
CREATE TABLE prescriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  medication_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50) NOT NULL,
  frequency VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  vet_id INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (vet_id) REFERENCES veterinarians(id) ON DELETE SET NULL
);

-- Insert sample data for Users
INSERT INTO users (username, password, email, role) VALUES
('admin', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'admin@petclinic.com', 'admin'),
('drjohnson', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'sarah.johnson@petclinic.com', 'vet'),
('drchen', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'michael.chen@petclinic.com', 'vet'),
('drrodriguez', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'emily.rodriguez@petclinic.com', 'vet'),
('drwilson', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'james.wilson@petclinic.com', 'vet'),
('johndoe', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'john.doe@example.com', 'client'),
('janesmith', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'jane.smith@example.com', 'client'),
('mikejohnson', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'mike.johnson@example.com', 'client'),
('sarahwilliams', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'sarah.williams@example.com', 'client'),
('davidmiller', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'david.miller@example.com', 'client'),
('emilydavis', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E0kEi6yxLqoyu', 'emily.davis@example.com', 'client');

-- Insert sample data for Veterinarians
INSERT INTO veterinarians (first_name, last_name, specialization, email, phone, license_number, user_id) VALUES
('Sarah', 'Johnson', 'Surgery, Internal Medicine', 'sarah.johnson@petclinic.com', '(555) 123-4567', 'VET12345', 2),
('Michael', 'Chen', 'Dermatology, Nutrition', 'michael.chen@petclinic.com', '(555) 234-5678', 'VET23456', 3),
('Emily', 'Rodriguez', 'Exotic Pets, Avian Medicine', 'emily.rodriguez@petclinic.com', '(555) 345-6789', 'VET34567', 4),
('James', 'Wilson', 'Dental Surgery, Oral Health', 'james.wilson@petclinic.com', '(555) 456-7890', 'VET45678', 5);

-- Insert sample data for Owners
INSERT INTO owners (first_name, last_name, email, phone, address, city, state, zip_code, user_id) VALUES
('John', 'Doe', 'john.doe@example.com', '(555) 111-2222', '123 Main St', 'Springfield', 'IL', '62701', 6),
('Jane', 'Smith', 'jane.smith@example.com', '(555) 222-3333', '456 Elm St', 'Springfield', 'IL', '62702', 7),
('Mike', 'Johnson', 'mike.johnson@example.com', '(555) 333-4444', '789 Oak St', 'Springfield', 'IL', '62703', 8),
('Sarah', 'Williams', 'sarah.williams@example.com', '(555) 444-5555', '321 Pine St', 'Springfield', 'IL', '62704', 9),
('David', 'Miller', 'david.miller@example.com', '(555) 555-6666', '654 Maple St', 'Springfield', 'IL', '62705', 10),
('Emily', 'Davis', 'emily.davis@example.com', '(555) 666-7777', '987 Cedar St', 'Springfield', 'IL', '62706', 11);

-- Insert sample data for Pets
INSERT INTO pets (name, species, breed, date_of_birth, gender, microchip_id, owner_id) VALUES
('Max', 'Dog', 'Golden Retriever', '2020-04-15', 'Male', 'CHIP900001', 1),
('Luna', 'Cat', 'Siamese', '2021-06-10', 'Female', 'CHIP900002', 2),
('Buddy', 'Dog', 'German Shepherd', '2019-03-22', 'Male', 'CHIP900003', 3),
('Coco', 'Rabbit', 'Holland Lop', '2022-01-05', 'Female', 'CHIP900004', 4),
('Rocky', 'Dog', 'Bulldog', '2018-08-12', 'Male', 'CHIP900005', 5),
('Milo', 'Cat', 'Maine Coon', '2020-11-30', 'Male', 'CHIP900006', 6);

-- Insert sample data for Appointments
INSERT INTO appointments (pet_id, vet_id, appointment_date, appointment_time, reason, status, notes) VALUES
(1, 1, '2023-09-15', '10:00:00', 'Annual checkup', 'Completed', 'Pet is in good health'),
(2, 2, '2023-09-20', '14:30:00', 'Skin issue', 'Completed', 'Prescribed medicated shampoo'),
(3, 1, '2023-09-25', '11:00:00', 'Limping', 'Completed', 'Minor sprain, rest recommended'),
(4, 3, '2023-10-05', '09:30:00', 'Dental checkup', 'Scheduled', NULL),
(5, 4, '2023-10-10', '16:00:00', 'Vaccination', 'Scheduled', NULL),
(6, 2, '2023-10-15', '13:00:00', 'Weight management', 'Scheduled', NULL);

-- Insert sample data for Medical Records
INSERT INTO medical_records (pet_id, vet_id, visit_date, diagnosis, treatment, notes, weight, temperature) VALUES
(1, 1, '2023-09-15', 'Healthy', 'None required', 'Annual checkup completed', 32.5, 38.5),
(2, 2, '2023-09-20', 'Dermatitis', 'Medicated shampoo twice weekly', 'Follow up in 2 weeks', 8.2, 38.8),
(3, 1, '2023-09-25', 'Mild sprain - left front paw', 'Rest and anti-inflammatory', 'Limit exercise for 1 week', 38.1, 38.6);

-- Insert sample data for Vaccines
INSERT INTO vaccines (pet_id, vaccine_name, administered_date, expiration_date, administered_by, lot_number, notes) VALUES
(1, 'Rabies', '2023-03-15', '2024-03-15', 1, 'RAB12345', 'Annual vaccine'),
(2, 'FVRCP', '2023-02-20', '2024-02-20', 2, 'FVRCP6789', 'Three-year vaccine'),
(3, 'Distemper', '2023-04-10', '2024-04-10', 1, 'DIST5678', 'Annual vaccine'),
(5, 'Bordetella', '2023-08-01', '2024-02-01', 4, 'BORD2345', 'Six-month vaccine');

-- Insert sample data for Prescriptions
INSERT INTO prescriptions (pet_id, medication_name, dosage, frequency, start_date, end_date, vet_id, notes) VALUES
(2, 'Prednisone', '5mg', 'Once daily', '2023-09-20', '2023-10-04', 2, 'Administer with food'),
(3, 'Carprofen', '25mg', 'Twice daily', '2023-09-25', '2023-10-02', 1, 'For pain management');
