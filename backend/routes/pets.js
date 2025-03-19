
const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

// GET all pets
router.get('/', petsController.getAllPets);

// GET a single pet by ID
router.get('/:id', petsController.getPetById);

// POST a new pet
router.post('/', petsController.createPet);

// PUT/UPDATE a pet
router.put('/:id', petsController.updatePet);

// DELETE a pet
router.delete('/:id', petsController.deletePet);

module.exports = router;
