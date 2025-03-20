
-- Enhanced PetClinic Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS vaccinations;
DROP TABLE IF EXISTS surgeries;
DROP TABLE IF EXISTS lab_tests;
DROP TABLE IF EXISTS consultations;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS users;

-- Create Users table
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

-- Create Staff table
CREATE TABLE staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  position VARCHAR(100) NOT NULL,
  specialty VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20),
  hire_date DATE NOT NULL,
  status ENUM('active', 'on_leave', 'terminated') DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Owners table
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
  registration_date DATE NOT NULL,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Pets table
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
  duration INT, -- in minutes
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
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Create Appointments table
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  owner_id INT NOT NULL,
  staff_id INT,
  date_time DATETIME NOT NULL,
  duration INT DEFAULT 30, -- in minutes
  appointment_type ENUM('check_up', 'vaccination', 'surgery', 'consultation', 'emergency', 'follow_up', 'grooming') NOT NULL,
  reason TEXT,
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert sample users
INSERT INTO users (username, password, email, role, first_name, last_name, profile_picture)
VALUES 
('admin', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'admin@petclinic.com', 'admin', 'Admin', 'User', 'https://randomuser.me/api/portraits/men/1.jpg'),
('drsmith', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'smith@petclinic.com', 'vet', 'John', 'Smith', 'https://randomuser.me/api/portraits/men/2.jpg'),
('drjones', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'jones@petclinic.com', 'vet', 'Sarah', 'Jones', 'https://randomuser.me/api/portraits/women/2.jpg'),
('nurse1', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'nurse1@petclinic.com', 'assistant', 'Emily', 'Brown', 'https://randomuser.me/api/portraits/women/3.jpg'),
('reception', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'reception@petclinic.com', 'receptionist', 'Michael', 'Johnson', 'https://randomuser.me/api/portraits/men/4.jpg'),
('jdoe', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'jdoe@email.com', 'owner', 'John', 'Doe', 'https://randomuser.me/api/portraits/men/5.jpg'),
('asmith', '$2a$10$Z7V3vFDhdvhWL3wpKj/q5Ou.9JFjbUwg3vWfQ.7tHNH2vQsHJ1f3a', 'asmith@email.com', 'owner', 'Alice', 'Smith', 'https://randomuser.me/api/portraits/women/5.jpg');

-- Insert sample staff
INSERT INTO staff (user_id, position, specialty, bio, phone, hire_date, status)
VALUES 
(1, 'Administrator', NULL, 'System administrator', '555-0100', '2020-01-01', 'active'),
(2, 'Veterinarian', 'Small Animals', 'Dr. Smith is a small animal specialist with 15 years of experience.', '555-0101', '2020-02-15', 'active'),
(3, 'Veterinarian', 'Surgery', 'Dr. Jones specializes in complex pet surgeries and has 10 years of experience.', '555-0102', '2020-03-20', 'active'),
(4, 'Veterinary Nurse', NULL, 'Emily is a certified veterinary nurse with 5 years of experience.', '555-0103', '2021-01-10', 'active'),
(5, 'Receptionist', NULL, 'Michael manages our front desk and scheduling.', '555-0104', '2021-02-01', 'active');

-- Insert sample owners
INSERT INTO owners (user_id, first_name, last_name, email, phone, address, city, state, postal_code, registration_date, notes)
VALUES 
(6, 'John', 'Doe', 'jdoe@email.com', '555-0105', '123 Main St', 'Springfield', 'IL', '62701', '2022-01-15', 'Regular client'),
(7, 'Alice', 'Smith', 'asmith@email.com', '555-0106', '456 Oak Ave', 'Springfield', 'IL', '62702', '2022-02-20', NULL),
(NULL, 'Bob', 'Johnson', 'bjohnson@email.com', '555-0107', '789 Pine St', 'Springfield', 'IL', '62703', '2022-03-25', 'Prefers afternoon appointments'),
(NULL, 'Carol', 'Williams', 'cwilliams@email.com', '555-0108', '321 Elm St', 'Springfield', 'IL', '62704', '2022-04-10', NULL),
(NULL, 'David', 'Brown', 'dbrown@email.com', '555-0109', '654 Maple Dr', 'Springfield', 'IL', '62705', '2022-05-05', 'Has multiple pets');

-- Insert sample pets
INSERT INTO pets (owner_id, name, species, breed, color, date_of_birth, gender, microchip_id, weight, weight_unit, allergies, existing_conditions, notes)
VALUES 
(1, 'Max', 'Dog', 'Labrador Retriever', 'Yellow', '2020-06-15', 'male', 'ABC123456', 32.5, 'kg', 'None', 'None', 'Friendly dog'),
(1, 'Bella', 'Dog', 'German Shepherd', 'Black and Tan', '2021-03-10', 'female', 'DEF789012', 28.3, 'kg', 'Chicken', 'None', 'Protective of home'),
(2, 'Whiskers', 'Cat', 'Siamese', 'Cream', '2019-12-05', 'male', 'GHI345678', 4.2, 'kg', 'None', 'Asthma', 'Indoor cat'),
(3, 'Lucky', 'Dog', 'Beagle', 'Tricolor', '2018-08-20', 'male', 'JKL901234', 12.7, 'kg', 'None', 'Hip dysplasia', 'Loves to run'),
(4, 'Mittens', 'Cat', 'Maine Coon', 'Tabby', '2020-02-14', 'female', 'MNO567890', 5.8, 'kg', 'Fish', 'None', 'Very affectionate'),
(5, 'Rex', 'Dog', 'Boxer', 'Brindle', '2019-05-30', 'male', 'PQR123456', 29.4, 'kg', 'None', 'None', 'Energetic'),
(5, 'Fluffy', 'Cat', 'Persian', 'White', '2021-01-23', 'female', 'STU789012', 3.9, 'kg', 'Dairy', 'None', 'Requires regular grooming'),
(5, 'Buddy', 'Dog', 'Golden Retriever', 'Golden', '2017-11-12', 'male', 'VWX345678', 31.2, 'kg', 'None', 'Arthritis', 'Senior dog');

-- Insert sample consultations
INSERT INTO consultations (pet_id, staff_id, date_time, reason_for_visit, diagnosis, treatment, notes, follow_up_date, status)
VALUES 
(1, 2, '2023-01-10 09:30:00', 'Annual checkup', 'Healthy', 'None required', 'All vitals normal', NULL, 'completed'),
(2, 2, '2023-01-12 14:00:00', 'Limping on right front leg', 'Minor sprain', 'Rest for 7 days, pain medication prescribed', 'Instructed owner on proper medication administration', '2023-01-19', 'completed'),
(3, 3, '2023-01-15 10:15:00', 'Trouble breathing', 'Asthma flare-up', 'Prescribed inhaler and anti-inflammatory', 'Demonstrated how to use pet inhaler to owner', '2023-01-29', 'completed'),
(4, 2, '2023-01-20 11:30:00', 'Hip pain assessment', 'Progressive hip dysplasia', 'Pain management and possible surgical consultation', 'Discussing options with owner', '2023-02-03', 'completed'),
(5, 3, '2023-02-05 13:45:00', 'Not eating for 2 days', 'Dental infection', 'Antibiotics and dental cleaning scheduled', 'Requires dental procedure', '2023-02-15', 'completed'),
(6, 2, '2023-02-10 15:30:00', 'Annual checkup', 'Healthy', 'Vaccines updated', 'No concerns', NULL, 'completed'),
(7, 3, '2023-02-15 09:00:00', 'Eye discharge', 'Conjunctivitis', 'Eye drops prescribed', 'Show owner how to administer drops', '2023-02-22', 'completed'),
(8, 2, '2023-03-01 10:45:00', 'Arthritis checkup', 'Stable arthritis', 'Continued current medication, added joint supplement', 'Mobility slightly improved', '2023-04-01', 'completed'),
(1, 2, '2023-04-15 14:30:00', 'Upset stomach', 'Dietary indiscretion', 'Special diet for 3 days', 'Likely ate something outside', NULL, 'completed'),
(3, 3, '2023-04-20 11:15:00', 'Asthma follow-up', 'Well-controlled asthma', 'Continue current treatment', 'Improved breathing', '2023-07-20', 'completed');

-- Insert sample vaccinations
INSERT INTO vaccinations (pet_id, staff_id, vaccine_name, date_administered, vaccine_lot_number, manufacturer, expiration_date, next_due_date, notes)
VALUES 
(1, 4, 'Rabies', '2023-01-10', 'RAB123456', 'VetVax', '2024-01-01', '2024-01-10', 'Annual vaccine'),
(1, 4, 'DHPP', '2023-01-10', 'DHPP789012', 'PetShield', '2024-02-01', '2024-01-10', 'Annual vaccine'),
(2, 4, 'Rabies', '2023-01-12', 'RAB123457', 'VetVax', '2024-01-01', '2024-01-12', 'Annual vaccine'),
(2, 4, 'DHPP', '2023-01-12', 'DHPP789013', 'PetShield', '2024-02-01', '2024-01-12', 'Annual vaccine'),
(3, 4, 'Rabies', '2023-01-15', 'RAB123458', 'VetVax', '2024-01-01', '2024-01-15', 'Annual vaccine'),
(3, 4, 'FVRCP', '2023-01-15', 'FVR345678', 'FelineCare', '2024-03-01', '2024-01-15', 'Annual vaccine'),
(4, 4, 'Rabies', '2023-01-20', 'RAB123459', 'VetVax', '2024-01-01', '2024-01-20', 'Annual vaccine'),
(5, 4, 'Rabies', '2023-02-05', 'RAB123460', 'VetVax', '2024-01-01', '2024-02-05', 'Annual vaccine'),
(5, 4, 'FVRCP', '2023-02-05', 'FVR345679', 'FelineCare', '2024-03-01', '2024-02-05', 'Annual vaccine'),
(6, 4, 'Rabies', '2023-02-10', 'RAB123461', 'VetVax', '2024-01-01', '2024-02-10', 'Annual vaccine'),
(6, 4, 'DHPP', '2023-02-10', 'DHPP789014', 'PetShield', '2024-02-01', '2024-02-10', 'Annual vaccine'),
(7, 4, 'Rabies', '2023-02-15', 'RAB123462', 'VetVax', '2024-01-01', '2024-02-15', 'Annual vaccine'),
(7, 4, 'FVRCP', '2023-02-15', 'FVR345680', 'FelineCare', '2024-03-01', '2024-02-15', 'Annual vaccine'),
(8, 4, 'Rabies', '2023-03-01', 'RAB123463', 'VetVax', '2024-01-01', '2024-03-01', 'Annual vaccine'),
(8, 4, 'DHPP', '2023-03-01', 'DHPP789015', 'PetShield', '2024-02-01', '2024-03-01', 'Annual vaccine');

-- Insert sample appointments
INSERT INTO appointments (pet_id, owner_id, staff_id, date_time, duration, appointment_type, reason, status, notes, created_by)
VALUES 
(1, 1, 2, '2023-05-15 09:00:00', 30, 'check_up', 'Annual wellness exam', 'scheduled', NULL, 1),
(2, 1, 3, '2023-05-15 10:00:00', 30, 'follow_up', 'Check healing progress', 'scheduled', NULL, 1),
(3, 2, 2, '2023-05-16 09:30:00', 30, 'check_up', 'Asthma monitoring', 'scheduled', NULL, 5),
(4, 3, 3, '2023-05-16 14:00:00', 45, 'consultation', 'Surgical options for hip dysplasia', 'scheduled', NULL, 5),
(5, 4, 2, '2023-05-17 11:30:00', 30, 'follow_up', 'Post-dental check', 'scheduled', NULL, 5),
(6, 5, 2, '2023-05-17 15:30:00', 30, 'vaccination', 'Bordatella vaccine due', 'scheduled', NULL, 1),
(7, 5, 3, '2023-05-18 09:00:00', 30, 'follow_up', 'Eye infection check', 'scheduled', NULL, 5),
(8, 5, 2, '2023-05-18 10:30:00', 30, 'check_up', 'Arthritis management review', 'scheduled', NULL, 5),
(1, 1, 2, '2023-05-20 13:00:00', 60, 'grooming', 'Full grooming service', 'scheduled', 'Client requested specific groomer', 5),
(3, 2, 3, '2023-05-21 14:00:00', 30, 'check_up', 'Weight management follow-up', 'scheduled', NULL, 1);

-- Insert sample surgeries
INSERT INTO surgeries (pet_id, lead_surgeon_id, assistant_id, surgery_type, date_time, duration, anesthesia, description, complications, post_op_instructions, status)
VALUES 
(2, 3, 4, 'Spay', '2023-02-05 08:00:00', 60, 'Isoflurane', 'Routine spay procedure', 'None', 'Restrict activity for 7 days, monitor incision, pain medication as prescribed', 'completed'),
(4, 3, 4, 'Exploratory Laparotomy', '2023-03-10 08:30:00', 90, 'Isoflurane', 'Exploratory surgery to identify cause of abdominal pain', 'None', 'Restrict activity for 14 days, monitor incision, pain medication and antibiotics as prescribed', 'completed'),
(6, 3, 4, 'Dental Extraction', '2023-03-15 09:00:00', 120, 'Isoflurane', 'Removal of 3 damaged teeth', 'Minor bleeding', 'Soft food for 7 days, antibiotics and pain medication as prescribed', 'completed'),
(8, 3, 4, 'Mass Removal', '2023-04-01 08:00:00', 45, 'Isoflurane', 'Removal of benign lipoma from left flank', 'None', 'Monitor incision, restrict activity for 7 days, pain medication as prescribed', 'completed'),
(5, 3, 4, 'Foreign Body Removal', '2023-04-10 08:30:00', 75, 'Isoflurane', 'Removal of ingested toy from stomach', 'None', 'Restrict activity for 10 days, monitor incision, special diet and medications as prescribed', 'completed');

-- Insert sample lab tests
INSERT INTO lab_tests (consultation_id, pet_id, staff_id, test_type, date_time, results, notes, status)
VALUES 
(1, 1, 4, 'Complete Blood Count', '2023-01-10 10:00:00', 'All values within normal range', 'Routine annual screening', 'completed'),
(1, 1, 4, 'Chemistry Panel', '2023-01-10 10:00:00', 'All values within normal range', 'Routine annual screening', 'completed'),
(2, 2, 4, 'X-ray', '2023-01-12 14:30:00', 'No fractures or abnormalities detected', 'Right front leg X-ray', 'completed'),
(3, 3, 4, 'Complete Blood Count', '2023-01-15 10:45:00', 'Slight elevation in white blood cells', 'Consistent with asthma inflammation', 'completed'),
(4, 4, 4, 'X-ray', '2023-01-20 12:00:00', 'Significant hip joint deterioration bilaterally', 'Hip dysplasia confirmation', 'completed'),
(5, 5, 4, 'Oral Examination', '2023-02-05 14:15:00', 'Infection present in lower left molar', 'Dental chart updated', 'completed'),
(8, 8, 4, 'Joint Fluid Analysis', '2023-03-01 11:15:00', 'Consistent with osteoarthritis', 'No evidence of infection', 'completed'),
(9, 1, 4, 'Fecal Analysis', '2023-04-15 15:00:00', 'No parasites detected', 'Routine screening', 'completed'),
(10, 3, 4, 'Respiratory Function Test', '2023-04-20 11:45:00', 'Improved lung function from previous test', 'Response to medication positive', 'completed');
