
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import petRoutes from './routes/pets.js';
import ownerRoutes from './routes/owners.js';
import appointmentRoutes from './routes/appointments.js';
import consultationRoutes from './routes/consultations.js';
import laboratoryRoutes from './routes/laboratory.js';
import vaccinationRoutes from './routes/vaccinations.js';
import surgeryRoutes from './routes/surgery.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
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
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
