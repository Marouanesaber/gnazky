
-- Drop existing database if it exists and create a new one
DROP DATABASE IF EXISTS pet_clinic;
CREATE DATABASE pet_clinic;
USE pet_clinic;

-- Create owners table
CREATE TABLE owners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create species table
CREATE TABLE species (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pets table
CREATE TABLE pets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  chip_id VARCHAR(50) UNIQUE,
  birth_date DATE,
  species_id INT,
  breed VARCHAR(100),
  weight DECIMAL(5,2),
  gender ENUM('Male', 'Female', 'Unknown') DEFAULT 'Unknown',
  owner_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (species_id) REFERENCES species(id),
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- Create veterinarians table
CREATE TABLE veterinarians (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  hire_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  veterinarian_id INT,
  appointment_date DATETIME NOT NULL,
  reason VARCHAR(255),
  status ENUM('Scheduled', 'Completed', 'Cancelled', 'No-Show') DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Create medical records table
CREATE TABLE medical_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  appointment_id INT,
  veterinarian_id INT,
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  notes TEXT,
  record_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Create vaccines table
CREATE TABLE vaccines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vaccinations table (records of administered vaccines)
CREATE TABLE vaccinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  vaccine_id INT NOT NULL,
  date_administered DATE NOT NULL,
  date_valid_until DATE,
  administered_by INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (vaccine_id) REFERENCES vaccines(id),
  FOREIGN KEY (administered_by) REFERENCES veterinarians(id)
);

-- Create users table for authentication
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin', 'veterinarian', 'receptionist', 'user') NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create invoices table
CREATE TABLE invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  appointment_id INT,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status ENUM('Pending', 'Paid', 'Cancelled') DEFAULT 'Pending',
  payment_date DATETIME,
  invoice_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Create invoice items table
CREATE TABLE invoice_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Create surgeries table
CREATE TABLE surgeries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  veterinarian_id INT NOT NULL,
  surgery_date DATETIME NOT NULL,
  surgery_type VARCHAR(255) NOT NULL,
  notes TEXT,
  status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Create laboratory tests table
CREATE TABLE laboratory_tests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  test_type VARCHAR(100) NOT NULL,
  requested_by INT,
  requested_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_date DATETIME,
  results TEXT,
  notes TEXT,
  status ENUM('Requested', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Requested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (requested_by) REFERENCES veterinarians(id)
);

-- Insert some sample data for species
INSERT INTO species (name) VALUES 
('Dog'),
('Cat'),
('Bird'),
('Rabbit'),
('Reptile'),
('Other');

-- Insert sample veterinarians
INSERT INTO veterinarians (first_name, last_name, specialization, email, phone, hire_date) VALUES
('Sarah', 'Johnson', 'Small Animal Surgery', 'sarah@petclinic.com', '+233 50 123 4567', '2019-05-15'),
('Michael', 'Thompson', 'Veterinary Dentist', 'michael@petclinic.com', '+233 50 987 6543', '2020-03-10'),
('Rebecca', 'Owusu', 'Exotic Animals', 'rebecca@petclinic.com', '+233 55 456 7890', '2018-11-22'),
('James', 'Wilson', 'Orthopedic Surgery', 'james@petclinic.com', '+233 50 222 3333', '2021-01-05'),
('Lisa', 'Mensah', 'Feline Medicine', 'lisa@petclinic.com', '+233 55 888 9999', '2017-08-15');

-- Insert some sample owners
INSERT INTO owners (first_name, last_name, address, city, phone, email) VALUES
('Tim', 'Lafaungih', 'Haber uti giflu gudofami', 'Accra', '+233 55 123 45', 'tim@example.com'),
('Leah', 'Akosua', 'Haber uti giflu gudofami', 'Accra', '+233 55 123 45', 'leah@example.com'),
('Ahmed', 'Kobla', 'Wolesi egtu le', 'Kumasi', '+233 55 667 88', 'ahmed@example.com'),
('Lydia', 'Nyanko', 'Nuniwa Oj', 'Tema', '+233 50 123 456', 'lydia@example.com'),
('Greg', 'Kwame', 'Tep Street', 'Cape Coast', '+233 267 222', 'greg@example.com');

-- Insert sample vaccines
INSERT INTO vaccines (name, description) VALUES
('Rabies', 'Protects against rabies virus'),
('DHPP', 'Distemper, Hepatitis, Parainfluenza, Parvovirus for dogs'),
('FVRCP', 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia for cats'),
('Bordetella', 'Protects against kennel cough'),
('Leptospirosis', 'Protects against bacterial infection');

-- Insert sample pets
INSERT INTO pets (name, chip_id, birth_date, species_id, breed, weight, gender, owner_id) VALUES
('Teddy', 'CHIP900001', '2020-01-10', 1, 'Poodle', 12.5, 'Male', 1),
('Buddy', 'CHIP900002', '2021-05-15', 1, 'Labrador', 25.2, 'Male', 2),
('Whiskers', 'CHIP900003', '2019-03-22', 2, 'Siamese', 4.3, 'Female', 3),
('Lucy', 'CHIP900004', '2022-07-05', 1, 'Beagle', 8.7, 'Female', 4),
('Max', 'CHIP900005', '2018-11-30', 1, 'German Shepherd', 35.4, 'Male', 5);

-- Insert sample users
INSERT INTO users (username, password, email, role) VALUES
('admin', '$2a$12$ZhlFKrCYUYJJBEz0dVjS5.1wUxc6JSZlweWCCqQjnwt/z2aU9.6hi', 'admin@petclinic.com', 'admin'),
('sarahj', '$2a$12$ZhlFKrCYUYJJBEz0dVjS5.1wUxc6JSZlweWCCqQjnwt/z2aU9.6hi', 'sarah@petclinic.com', 'veterinarian'),
('reception', '$2a$12$ZhlFKrCYUYJJBEz0dVjS5.1wUxc6JSZlweWCCqQjnwt/z2aU9.6hi', 'reception@petclinic.com', 'receptionist');

-- Insert sample appointments
INSERT INTO appointments (pet_id, veterinarian_id, appointment_date, reason, status) VALUES
(1, 1, '2023-05-15 10:00:00', 'Annual Checkup', 'Completed'),
(2, 3, '2023-06-20 14:30:00', 'Vaccination', 'Completed'),
(3, 2, '2023-04-25 11:15:00', 'Dental Cleaning', 'Completed'),
(4, 5, '2023-07-10 09:45:00', 'Paw Injury', 'Completed'),
(5, 1, '2023-02-05 13:00:00', 'Annual Checkup', 'Completed'),
(1, 4, '2023-08-15 15:30:00', 'Follow-up', 'Scheduled');

-- Insert sample vaccinations
INSERT INTO vaccinations (pet_id, vaccine_id, date_administered, date_valid_until, administered_by) VALUES
(1, 1, '2023-05-15', '2024-05-15', 1),
(1, 2, '2023-03-10', '2024-03-10', 4),
(2, 1, '2023-06-20', '2024-06-20', 3),
(3, 3, '2023-04-25', '2024-04-25', 2),
(3, 1, '2023-04-25', '2024-04-25', 2),
(4, 4, '2023-07-10', '2024-01-10', 5),
(5, 1, '2023-02-05', '2024-02-05', 1),
(5, 2, '2023-02-05', '2024-02-05', 1),
(5, 5, '2023-02-05', '2024-02-05', 1);

-- Create stored procedures

-- Procedure to get all pets for a specific owner
DELIMITER //
CREATE PROCEDURE GetPetsByOwner(IN owner_id_param INT)
BEGIN
    SELECT p.*, s.name as species_name
    FROM pets p
    JOIN species s ON p.species_id = s.id
    WHERE p.owner_id = owner_id_param;
END //
DELIMITER ;

-- Procedure to get all appointments for a specific pet
DELIMITER //
CREATE PROCEDURE GetPetAppointments(IN pet_id_param INT)
BEGIN
    SELECT a.*, CONCAT(v.first_name, ' ', v.last_name) as veterinarian_name
    FROM appointments a
    LEFT JOIN veterinarians v ON a.veterinarian_id = v.id
    WHERE a.pet_id = pet_id_param
    ORDER BY a.appointment_date DESC;
END //
DELIMITER ;

-- Procedure to get vaccination history for a pet
DELIMITER //
CREATE PROCEDURE GetPetVaccinations(IN pet_id_param INT)
BEGIN
    SELECT v.*, vac.name as vaccine_name, 
           CONCAT(vet.first_name, ' ', vet.last_name) as administered_by_name
    FROM vaccinations v
    JOIN vaccines vac ON v.vaccine_id = vac.id
    LEFT JOIN veterinarians vet ON v.administered_by = vet.id
    WHERE v.pet_id = pet_id_param
    ORDER BY v.date_administered DESC;
END //
DELIMITER ;

-- Procedure to get laboratory tests for a pet
DELIMITER //
CREATE PROCEDURE GetPetLabTests(IN pet_id_param INT)
BEGIN
    SELECT lt.*, CONCAT(v.first_name, ' ', v.last_name) as requested_by_name
    FROM laboratory_tests lt
    LEFT JOIN veterinarians v ON lt.requested_by = v.id
    WHERE lt.pet_id = pet_id_param
    ORDER BY lt.requested_date DESC;
END //
DELIMITER ;

-- Procedure to get all medical records for a pet
DELIMITER //
CREATE PROCEDURE GetPetMedicalRecords(IN pet_id_param INT)
BEGIN
    SELECT mr.*, 
           CONCAT(v.first_name, ' ', v.last_name) as veterinarian_name,
           a.appointment_date
    FROM medical_records mr
    LEFT JOIN veterinarians v ON mr.veterinarian_id = v.id
    LEFT JOIN appointments a ON mr.appointment_id = a.id
    WHERE mr.pet_id = pet_id_param
    ORDER BY mr.record_date DESC;
END //
DELIMITER ;

-- Create database views

-- View for upcoming appointments
CREATE VIEW upcoming_appointments AS
SELECT a.id, a.appointment_date, a.reason, a.status,
       p.name as pet_name, p.chip_id,
       CONCAT(o.first_name, ' ', o.last_name) as owner_name, o.phone as owner_phone,
       CONCAT(v.first_name, ' ', v.last_name) as veterinarian_name
FROM appointments a
JOIN pets p ON a.pet_id = p.id
JOIN owners o ON p.owner_id = o.id
LEFT JOIN veterinarians v ON a.veterinarian_id = v.id
WHERE a.status = 'Scheduled' AND a.appointment_date >= CURRENT_DATE()
ORDER BY a.appointment_date;

-- View for vaccinations due in the next 30 days
CREATE VIEW upcoming_vaccinations AS
SELECT p.id as pet_id, p.name as pet_name, p.chip_id,
       CONCAT(o.first_name, ' ', o.last_name) as owner_name, o.phone as owner_phone, o.email as owner_email,
       vac.name as vaccine_name, v.date_valid_until
FROM vaccinations v
JOIN pets p ON v.pet_id = p.id
JOIN owners o ON p.owner_id = o.id
JOIN vaccines vac ON v.vaccine_id = vac.id
WHERE v.date_valid_until BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)
ORDER BY v.date_valid_until;

-- View for pet registration with owner information
CREATE VIEW pet_registrations AS
SELECT p.id, p.name, p.chip_id, p.birth_date, p.breed, p.gender,
       s.name as species,
       CONCAT(o.first_name, ' ', o.last_name) as owner_name,
       o.email as owner_email, o.phone as owner_phone,
       p.created_at as registration_date
FROM pets p
JOIN species s ON p.species_id = s.id
JOIN owners o ON p.owner_id = o.id
ORDER BY p.created_at DESC;
