
-- tables-medical.sql - Medical procedures and appointments

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

-- Add indexes for medical tables
CREATE INDEX idx_appointments_pet_id ON appointments(pet_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_vaccinations_pet_id ON vaccinations(pet_id);
CREATE INDEX idx_lab_tests_pet_id ON lab_tests(pet_id);
