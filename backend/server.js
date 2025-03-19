
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const petRoutes = require('./routes/pets');
const ownerRoutes = require('./routes/owners');
const appointmentRoutes = require('./routes/appointments');
const consultationRoutes = require('./routes/consultations');
const laboratoryRoutes = require('./routes/laboratory');
const vaccinationRoutes = require('./routes/vaccinations');
const surgeryRoutes = require('./routes/surgery');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Change this to your MySQL password
  database: 'pet_clinic'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Make db connection available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/pets', petRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/laboratory', laboratoryRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/surgery', surgeryRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
