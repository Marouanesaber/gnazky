
import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { 
  getAllVaccinations, 
  getVaccinationById, 
  createVaccination, 
  updateVaccination, 
  deleteVaccination 
} from '../controllers/vaccinationsController.js';

const router = express.Router();

// Apply authentication middleware with option to bypass for development if needed
// router.use(authenticateUser);  // Uncomment if you want strict auth

// GET all vaccinations
router.get('/', getAllVaccinations);

// GET a single vaccination by ID
router.get('/:id', getVaccinationById);

// POST a new vaccination
router.post('/', createVaccination);

// PUT/UPDATE a vaccination
router.put('/:id', updateVaccination);

// DELETE a vaccination
router.delete('/:id', deleteVaccination);

export default router;
