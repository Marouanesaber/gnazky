
-- sample-data.sql - Initial data for the pet clinic database

-- Sample admin user
INSERT INTO users (username, password, email, role, first_name, last_name) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@petclinic.com', 'admin', 'Admin', 'User');

-- Add more sample data as needed
