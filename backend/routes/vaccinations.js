
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

// Apply authentication middleware to all vaccination routes
router.use(authenticateUser);

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
