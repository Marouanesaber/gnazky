
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
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

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

// Authentication middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    // Allow request to proceed without user info if no token
    req.user = null;
    return next();
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    // If token is invalid, proceed without user info
    req.user = null;
    next();
  }
};

// Make db connection available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Apply the auth middleware to all routes
app.use(verifyToken);

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
  res.json({ message: 'Backend API is working!', user: req.user || 'Not authenticated' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
