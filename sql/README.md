
# Pet Clinic Database Schema

This directory contains the SQL scripts for setting up the Pet Clinic database.

## Files Structure

- `main.sql` - The main file that sources all other scripts in the correct order
- `tables-setup.sql` - Creates and selects the database
- `tables-users.sql` - Contains user and staff related tables
- `tables-owners-pets.sql` - Contains owner and pet related tables
- `tables-medical.sql` - Contains medical procedures and appointments tables
- `tables-shop.sql` - Contains shop-related tables
- `sample-data.sql` - Contains initial sample data for testing

## How to Use

Run the `main.sql` file to set up the entire database:

```sql
SOURCE sql/main.sql;
```

Or run individual files if you only need specific tables.

## Database Structure

The database consists of several interconnected tables:
- User authentication and roles
- Staff information
- Pet owners
- Pets and their medical information
- Appointments and consultations
- Medical procedures (surgeries, lab tests)
- Vaccinations
- Shop products and orders
