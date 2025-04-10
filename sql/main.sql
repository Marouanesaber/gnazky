
-- main.sql - Main SQL file to run all scripts in order

-- Source all SQL files in the correct order
SOURCE sql/tables-setup.sql;
SOURCE sql/tables-users.sql;
SOURCE sql/tables-owners-pets.sql;
SOURCE sql/tables-medical.sql;
SOURCE sql/tables-shop.sql;
SOURCE sql/sample-data.sql;

-- Confirm completion
SELECT 'Pet Clinic Database setup completed successfully!' AS 'Message';
