
-- Create vaccinations table
CREATE TABLE IF NOT EXISTS `vaccinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pet_id` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `type` varchar(100) NOT NULL,
  `by` varchar(100) NOT NULL,
  `temp` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pet_id` (`pet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert sample data for vaccinations
INSERT INTO `vaccinations` (`pet_id`, `date`, `type`, `by`, `temp`, `created_at`, `updated_at`) VALUES
('OVHMS0001', '2023-12-11', 'DHPP 1', 'Dr. Chen', '37.6°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0001', '2023-12-11', 'Anti Rabies Booster', 'Dr. Garcia', '37.9°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0001', '2024-02-20', 'Anti Rabies', 'Dr. Wilson', '38.0°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0008', '2024-01-02', 'Booster Shot', 'Dr. Johnson', '37.3°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0001', '2024-03-14', 'Annual Checkup', 'Dr. Smith', '38.2°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0011', '2024-01-05', 'DHPP 1', 'Dr. Williams', '37.7°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0011', '2024-02-05', 'Anti Rabies', 'Dr. Brown', '37.1°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OVHMS0011', '2024-03-03', 'DHPP 4', 'Dr. Davis', '37.5°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
