
-- Pet Clinic Database Schema
-- Version: 2.0
-- Last Updated: 2023

-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS appointment_services;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS vaccination_records;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS prescriptions;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS users;

-- Create Users table for authentication
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'veterinarian', 'receptionist', 'owner') NOT NULL,
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Staff table
CREATE TABLE staff (
  staff_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  specialization VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  hire_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create Owners table
CREATE TABLE owners (
  owner_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  emergency_contact VARCHAR(100),
  emergency_phone VARCHAR(20),
  registration_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create Pets table
CREATE TABLE pets (
  pet_id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  chip_id VARCHAR(50) UNIQUE,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(100),
  color VARCHAR(50),
  birth_date DATE,
  gender ENUM('male', 'female', 'unknown') NOT NULL,
  weight DECIMAL(5,2),
  weight_unit ENUM('kg', 'lb') DEFAULT 'kg',
  neutered BOOLEAN DEFAULT FALSE,
  allergies TEXT,
  registration_date DATE NOT NULL,
  registered_by INT,
  FOREIGN KEY (owner_id) REFERENCES owners(owner_id) ON DELETE CASCADE,
  FOREIGN KEY (registered_by) REFERENCES staff(staff_id) ON DELETE SET NULL
);

-- Create Services table
CREATE TABLE services (
  service_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  duration INT NOT NULL COMMENT 'Duration in minutes',
  price DECIMAL(10,2) NOT NULL,
  category ENUM('consultation', 'vaccination', 'surgery', 'grooming', 'dental', 'laboratory', 'other') NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

-- Create Appointments table
CREATE TABLE appointments (
  appointment_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  staff_id INT,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status ENUM('scheduled', 'confirmed', 'completed', 'canceled', 'no-show') NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Create Appointment_Services junction table
CREATE TABLE appointment_services (
  appointment_service_id INT PRIMARY KEY AUTO_INCREMENT,
  appointment_id INT NOT NULL,
  service_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price_at_time DECIMAL(10,2) NOT NULL COMMENT 'Price at the time of appointment',
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);

-- Create Medical Records table
CREATE TABLE medical_records (
  record_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  appointment_id INT,
  record_date DATE NOT NULL,
  record_type VARCHAR(100) NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE RESTRICT
);

-- Create Vaccination Records table
CREATE TABLE vaccination_records (
  vaccination_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  appointment_id INT,
  vaccine_name VARCHAR(100) NOT NULL,
  vaccination_date DATE NOT NULL,
  expiration_date DATE,
  lot_number VARCHAR(50),
  administered_by INT,
  notes TEXT,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
  FOREIGN KEY (administered_by) REFERENCES staff(staff_id) ON DELETE SET NULL
);

-- Create Prescriptions table
CREATE TABLE prescriptions (
  prescription_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  record_id INT,
  medication_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(100) NOT NULL,
  frequency VARCHAR(100) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  notes TEXT,
  prescribed_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (record_id) REFERENCES medical_records(record_id) ON DELETE SET NULL,
  FOREIGN KEY (prescribed_by) REFERENCES staff(staff_id) ON DELETE RESTRICT
);

-- Create Payments table
CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  appointment_id INT NOT NULL,
  owner_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method ENUM('cash', 'credit_card', 'debit_card', 'insurance', 'bank_transfer', 'other') NOT NULL,
  payment_date DATETIME NOT NULL,
  status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  reference_number VARCHAR(100),
  notes TEXT,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE RESTRICT,
  FOREIGN KEY (owner_id) REFERENCES owners(owner_id) ON DELETE RESTRICT
);

-- Insert sample data for testing

-- Insert Users
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@petclinic.com', '$2a$10$VzJEZ.DwJwD1F7xVzpSKz.s0JyZ6XtQgJ9yBJWwQxV7YVtGwElWGq', 'Admin', 'User', 'admin'),
('dr.smith@petclinic.com', '$2a$10$VzJEZ.DwJwD1F7xVzpSKz.s0JyZ6XtQgJ9yBJWwQxV7YVtGwElWGq', 'John', 'Smith', 'veterinarian'),
('dr.jones@petclinic.com', '$2a$10$VzJEZ.DwJwD1F7xVzpSKz.s0JyZ6XtQgJ9yBJWwQxV7YVtGwElWGq', 'Sarah', 'Jones', 'veterinarian'),
('receptionist@petclinic.com', '$2a$10$VzJEZ.DwJwD1F7xVzpSKz.s0JyZ6XtQgJ9yBJWwQxV7YVtGwElWGq', 'Emily', 'Davis', 'receptionist'),
('john.doe@example.com', '$2a$10$VzJEZ.DwJwD1F7xVzpSKz.s0JyZ6XtQgJ9yBJWwQxV7YVtGwElWGq', 'John', 'Doe', 'owner'),
('jane.smith@example.com', '$2a$10$VzJEZ.DwJwD1F7xVzpSKz.s0JyZ6XtQgJ9yBJWwQxV7YVtGwElWGq', 'Jane', 'Smith', 'owner');

-- Insert Staff
INSERT INTO staff (user_id, specialization, bio, phone, address, hire_date) VALUES
(1, 'Administrator', 'Main system administrator', '+1 555-123-4567', '123 Admin St, New York, NY', '2020-01-01'),
(2, 'Small Animals', 'Specialized in small animal medicine', '+1 555-234-5678', '456 Vet Dr, New York, NY', '2020-03-15'),
(3, 'Surgery', 'Specialized in veterinary surgery', '+1 555-345-6789', '789 Clinic Ave, New York, NY', '2021-05-10'),
(4, 'Reception', 'Front desk receptionist', '+1 555-456-7890', '101 Office Blvd, New York, NY', '2022-02-01');

-- Insert Owners
INSERT INTO owners (user_id, phone, address, emergency_contact, emergency_phone, registration_date) VALUES
(5, '+1 555-567-8901', '234 Pet Owner St, New York, NY', 'Mary Doe', '+1 555-678-9012', '2022-06-15'),
(6, '+1 555-678-9012', '567 Animal Lover Ave, New York, NY', 'Bob Smith', '+1 555-789-0123', '2022-07-20');

-- Insert Pets
INSERT INTO pets (owner_id, chip_id, name, species, breed, color, birth_date, gender, weight, neutered, allergies, registration_date, registered_by) VALUES
(1, 'CHIP900001', 'Max', 'Dog', 'Golden Retriever', 'Golden', '2020-05-15', 'male', 25.5, TRUE, 'None', '2022-06-20', 2),
(1, 'CHIP900002', 'Luna', 'Cat', 'Siamese', 'Cream', '2021-03-10', 'female', 4.2, TRUE, 'Chicken', '2022-06-20', 3),
(2, 'CHIP900003', 'Buddy', 'Dog', 'Beagle', 'Tricolor', '2019-08-22', 'male', 12.7, FALSE, 'None', '2022-07-25', 2),
(2, 'CHIP900004', 'Whiskers', 'Cat', 'Maine Coon', 'Brown Tabby', '2020-11-30', 'male', 6.8, TRUE, 'None', '2022-07-25', 3);

-- Insert Services
INSERT INTO services (name, description, duration, price, category) VALUES
('Routine Checkup', 'General health examination', 30, 50.00, 'consultation'),
('Vaccination - Rabies', 'Rabies vaccination for dogs and cats', 15, 25.00, 'vaccination'),
('Vaccination - DHPP', 'Distemper, Hepatitis, Parainfluenza, Parvovirus for dogs', 15, 30.00, 'vaccination'),
('Vaccination - FVRCP', 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia for cats', 15, 28.00, 'vaccination'),
('Dental Cleaning', 'Complete dental cleaning under anesthesia', 90, 200.00, 'dental'),
('Spay/Neuter - Cat', 'Spay or neuter procedure for cats', 60, 150.00, 'surgery'),
('Spay/Neuter - Dog', 'Spay or neuter procedure for dogs', 90, 200.00, 'surgery'),
('Basic Grooming', 'Bath, brush, nail trim, ear cleaning', 60, 50.00, 'grooming'),
('Blood Test - Basic', 'Complete blood count and basic chemistry panel', 30, 75.00, 'laboratory'),
('X-Ray', 'Single radiograph image', 30, 120.00, 'laboratory');

-- Insert Appointments
INSERT INTO appointments (pet_id, staff_id, appointment_date, start_time, end_time, status, notes, created_by) VALUES
(1, 2, '2023-05-20', '10:00:00', '10:30:00', 'completed', 'Annual checkup', 4),
(2, 3, '2023-06-15', '14:00:00', '15:30:00', 'completed', 'Dental cleaning', 4),
(3, 2, '2023-07-10', '09:30:00', '10:00:00', 'completed', 'Vaccination', 4),
(4, 3, '2023-08-05', '11:00:00', '11:30:00', 'completed', 'Checkup for weight management', 4),
(1, 2, '2023-09-15', '13:00:00', '13:30:00', 'confirmed', 'Follow-up appointment', 4),
(2, 2, '2023-09-20', '15:00:00', '15:30:00', 'scheduled', 'Vaccination booster', 4);

-- Insert Appointment Services
INSERT INTO appointment_services (appointment_id, service_id, quantity, price_at_time) VALUES
(1, 1, 1, 50.00),
(2, 5, 1, 200.00),
(3, 3, 1, 30.00),
(4, 1, 1, 50.00),
(5, 1, 1, 50.00),
(6, 4, 1, 28.00);

-- Insert Medical Records
INSERT INTO medical_records (pet_id, appointment_id, record_date, record_type, diagnosis, treatment, notes, created_by) VALUES
(1, 1, '2023-05-20', 'Checkup', 'Healthy', 'None required', 'Annual checkup, all vitals normal', 2),
(2, 2, '2023-06-15', 'Dental', 'Mild dental tartar', 'Dental cleaning performed', 'Some gingivitis noted, recommend dental diet', 3),
(3, 3, '2023-07-10', 'Vaccination', 'Healthy', 'DHPP vaccination administered', 'No adverse reactions observed', 2),
(4, 4, '2023-08-05', 'Checkup', 'Overweight', 'Diet plan prescribed', 'Recommend weight management food and increased exercise', 2);

-- Insert Vaccination Records
INSERT INTO vaccination_records (pet_id, appointment_id, vaccine_name, vaccination_date, expiration_date, lot_number, administered_by, notes) VALUES
(1, 1, 'Rabies', '2023-05-20', '2025-05-20', 'RAB456789', 2, 'Three-year vaccination'),
(2, 2, 'FVRCP', '2023-06-15', '2024-06-15', 'FVR123456', 3, 'Annual booster'),
(3, 3, 'DHPP', '2023-07-10', '2024-07-10', 'DHP789012', 2, 'Annual vaccination'),
(3, 3, 'Rabies', '2023-07-10', '2025-07-10', 'RAB567890', 2, 'Three-year vaccination');

-- Insert Prescriptions
INSERT INTO prescriptions (pet_id, record_id, medication_name, dosage, frequency, duration, start_date, end_date, notes, prescribed_by) VALUES
(2, 2, 'Antibiotics', '50mg', 'Twice daily', '7 days', '2023-06-15', '2023-06-22', 'Give with food', 3),
(4, 4, 'Joint Supplement', '1 tablet', 'Once daily', '30 days', '2023-08-05', '2023-09-04', 'To support joint health with weight loss', 2);

-- Insert Payments
INSERT INTO payments (appointment_id, owner_id, amount, payment_method, payment_date, status, reference_number) VALUES
(1, 1, 50.00, 'credit_card', '2023-05-20 10:45:00', 'completed', 'REF123456'),
(2, 1, 200.00, 'credit_card', '2023-06-15 15:45:00', 'completed', 'REF234567'),
(3, 2, 30.00, 'cash', '2023-07-10 10:15:00', 'completed', NULL),
(4, 2, 50.00, 'debit_card', '2023-08-05 11:45:00', 'completed', 'REF345678');

-- Create Views

-- View for upcoming appointments
CREATE VIEW upcoming_appointments AS
SELECT 
  a.appointment_id,
  a.appointment_date,
  a.start_time,
  a.end_time,
  a.status,
  p.name AS pet_name,
  p.species,
  p.breed,
  CONCAT(u_owner.first_name, ' ', u_owner.last_name) AS owner_name,
  o.phone AS owner_phone,
  CONCAT(u_staff.first_name, ' ', u_staff.last_name) AS staff_name,
  s.specialization AS staff_specialization
FROM 
  appointments a
JOIN 
  pets p ON a.pet_id = p.pet_id
JOIN 
  owners o ON p.owner_id = o.owner_id
JOIN 
  users u_owner ON o.user_id = u_owner.user_id
LEFT JOIN 
  staff s ON a.staff_id = s.staff_id
LEFT JOIN 
  users u_staff ON s.user_id = u_staff.user_id
WHERE 
  a.status IN ('scheduled', 'confirmed')
  AND a.appointment_date >= CURDATE()
ORDER BY 
  a.appointment_date, a.start_time;

-- View for pet vaccination status
CREATE VIEW pet_vaccination_status AS
SELECT 
  p.pet_id,
  p.name AS pet_name,
  p.species,
  p.breed,
  CONCAT(u.first_name, ' ', u.last_name) AS owner_name,
  vr.vaccine_name,
  vr.vaccination_date,
  vr.expiration_date,
  CASE 
    WHEN vr.expiration_date < CURDATE() THEN 'Expired'
    WHEN vr.expiration_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY) THEN 'Due Soon'
    ELSE 'Valid'
  END AS status
FROM 
  pets p
JOIN 
  owners o ON p.owner_id = o.owner_id
JOIN 
  users u ON o.user_id = u.user_id
LEFT JOIN 
  vaccination_records vr ON p.pet_id = vr.pet_id;

-- Create Stored Procedures

-- Procedure to find available appointment slots
DELIMITER //
CREATE PROCEDURE find_available_slots(IN p_date DATE, IN p_staff_id INT, IN p_duration INT)
BEGIN
  DECLARE start_time TIME DEFAULT '08:00:00';
  DECLARE end_time TIME DEFAULT '17:00:00';
  DECLARE curr_time TIME;
  
  DROP TEMPORARY TABLE IF EXISTS available_slots;
  CREATE TEMPORARY TABLE available_slots (
    start_time TIME,
    end_time TIME
  );
  
  SET curr_time = start_time;
  
  WHILE curr_time < end_time DO
    IF NOT EXISTS (
      SELECT 1 FROM appointments 
      WHERE appointment_date = p_date 
      AND staff_id = p_staff_id
      AND status NOT IN ('canceled', 'no-show')
      AND (
        (start_time <= curr_time AND end_time > curr_time) OR
        (start_time < ADDTIME(curr_time, SEC_TO_TIME(p_duration * 60)) AND end_time >= ADDTIME(curr_time, SEC_TO_TIME(p_duration * 60))) OR
        (start_time >= curr_time AND end_time <= ADDTIME(curr_time, SEC_TO_TIME(p_duration * 60)))
      )
    ) THEN
      INSERT INTO available_slots VALUES (curr_time, ADDTIME(curr_time, SEC_TO_TIME(p_duration * 60)));
    END IF;
    
    SET curr_time = ADDTIME(curr_time, '00:30:00');
  END WHILE;
  
  SELECT * FROM available_slots;
  DROP TEMPORARY TABLE available_slots;
END //
DELIMITER ;

-- Procedure to schedule an appointment
DELIMITER //
CREATE PROCEDURE schedule_appointment(
  IN p_pet_id INT,
  IN p_staff_id INT,
  IN p_date DATE,
  IN p_start_time TIME,
  IN p_duration INT,
  IN p_notes TEXT,
  IN p_created_by INT,
  OUT p_appointment_id INT
)
BEGIN
  DECLARE end_time TIME;
  
  -- Calculate end time based on duration
  SET end_time = ADDTIME(p_start_time, SEC_TO_TIME(p_duration * 60));
  
  -- Check for conflicts
  IF EXISTS (
    SELECT 1 FROM appointments 
    WHERE appointment_date = p_date 
    AND staff_id = p_staff_id
    AND status NOT IN ('canceled', 'no-show')
    AND (
      (start_time <= p_start_time AND end_time > p_start_time) OR
      (start_time < end_time AND end_time >= end_time) OR
      (start_time >= p_start_time AND end_time <= end_time)
    )
  ) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Time slot is not available';
  ELSE
    -- Insert the appointment
    INSERT INTO appointments (pet_id, staff_id, appointment_date, start_time, end_time, status, notes, created_by)
    VALUES (p_pet_id, p_staff_id, p_date, p_start_time, end_time, 'scheduled', p_notes, p_created_by);
    
    SET p_appointment_id = LAST_INSERT_ID();
  END IF;
END //
DELIMITER ;

-- Procedure to generate monthly revenue report
DELIMITER //
CREATE PROCEDURE generate_revenue_report(IN p_year INT, IN p_month INT)
BEGIN
  SELECT 
    s.category,
    s.name AS service_name,
    COUNT(as_s.appointment_service_id) AS service_count,
    SUM(as_s.price_at_time * as_s.quantity) AS total_revenue
  FROM 
    payments p
  JOIN 
    appointments a ON p.appointment_id = a.appointment_id
  JOIN 
    appointment_services as_s ON a.appointment_id = as_s.appointment_id
  JOIN 
    services s ON as_s.service_id = s.service_id
  WHERE 
    YEAR(p.payment_date) = p_year
    AND MONTH(p.payment_date) = p_month
    AND p.status = 'completed'
  GROUP BY 
    s.category, s.name
  ORDER BY 
    s.category, total_revenue DESC;
END //
DELIMITER ;

-- Add indexes for performance optimization
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_staff_date ON appointments(staff_id, appointment_date);
CREATE INDEX idx_appointments_pet ON appointments(pet_id);
CREATE INDEX idx_pets_owner ON pets(owner_id);
CREATE INDEX idx_medical_records_pet ON medical_records(pet_id);
CREATE INDEX idx_vaccination_records_pet ON vaccination_records(pet_id);
CREATE INDEX idx_vaccination_records_date ON vaccination_records(vaccination_date, expiration_date);
CREATE INDEX idx_payments_date ON payments(payment_date);
