
const express = require('express');
const router = express.Router();
const ownersController = require('../controllers/ownersController');

// GET all owners
router.get('/', ownersController.getAllOwners);

// GET a single owner by ID
router.get('/:id', ownersController.getOwnerById);

// GET all pets owned by an owner
router.get('/:id/pets', ownersController.getOwnerPets);

// POST a new owner
router.post('/', ownersController.createOwner);

// PUT/UPDATE an owner
router.put('/:id', ownersController.updateOwner);

// DELETE an owner
router.delete('/:id', ownersController.deleteOwner);

module.exports = router;
