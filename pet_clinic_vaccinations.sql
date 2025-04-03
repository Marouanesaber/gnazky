
-- Create vaccinations table
CREATE TABLE IF NOT EXISTS `vaccinations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
INSERT INTO `vaccinations` (`id`, `pet_id`, `date`, `type`, `by`, `temp`, `created_at`, `updated_at`) VALUES
(1, 'OVHMS0001', '2023-12-11', 'DHPP 1', 'Dr. Chen', '37.6°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'OVHMS0001', '2023-12-11', 'Anti Rabies Booster', 'Dr. Garcia', '37.9°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'OVHMS0001', '2024-02-20', 'Anti Rabies', 'Dr. Wilson', '38.0°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'OVHMS0008', '2024-01-02', 'Booster Shot', 'Dr. Johnson', '37.3°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'OVHMS0001', '2024-03-14', 'Annual Checkup', 'Dr. Smith', '38.2°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'OVHMS0011', '2025-01-05', 'DHPP 1', 'Admin Admin', '37.7°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'OVHMS0011', '2024-12-05', 'Anti Rabies', 'Admin Admin', '37.1°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'OVHMS0011', '2025-03-03', 'DHPP 4', 'Admin Admin', '37.5°C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
