
// Pets controller

// Get all pets
const getAllPets = (req, res) => {
  const db = req.db;
  
  db.query(`
    SELECT p.*, o.name as owner_name 
    FROM pets p
    JOIN owners o ON p.owner_id = o.id
    ORDER BY p.created_at DESC
  `, (err, results) => {
    if (err) {
      console.error('Error fetching pets:', err);
      return res.status(500).json({ error: 'Error fetching pets' });
    }
    
    res.status(200).json(results);
  });
};

// Get a single pet by ID
const getPetById = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  
  db.query(`
    SELECT p.*, o.name as owner_name 
    FROM pets p
    JOIN owners o ON p.owner_id = o.id
    WHERE p.id = ?
  `, [petId], (err, results) => {
    if (err) {
      console.error('Error fetching pet:', err);
      return res.status(500).json({ error: 'Error fetching pet' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.status(200).json(results[0]);
  });
};

// Create a new pet
const createPet = (req, res) => {
  const db = req.db;
  const { name, species, breed, age, gender, weight, color, microchip_id, owner_id, notes } = req.body;
  const userId = req.user?.id || null; // Get user ID from JWT token if available
  
  if (!name || !species || !owner_id) {
    return res.status(400).json({ error: 'Required fields: name, species, owner_id' });
  }
  
  const query = `
    INSERT INTO pets (
      name, species, breed, age, gender, weight, color, microchip_id, owner_id, notes, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(
    query, 
    [name, species, breed, age, gender, weight, color, microchip_id, owner_id, notes, userId], 
    (err, result) => {
      if (err) {
        console.error('Error creating pet:', err);
        return res.status(500).json({ error: 'Error creating pet: ' + err.message });
      }
      
      // Return the newly created pet data
      db.query('SELECT * FROM pets WHERE id = ?', [result.insertId], (err, pets) => {
        if (err || pets.length === 0) {
          return res.status(201).json({ 
            id: result.insertId, 
            message: 'Pet created successfully' 
          });
        }
        
        res.status(201).json({ 
          ...pets[0],
          message: 'Pet created successfully' 
        });
      });
    }
  );
};

// Update a pet
const updatePet = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  const { name, species, breed, age, gender, weight, color, microchip_id, owner_id, notes } = req.body;
  
  // Build the query based on provided fields
  let query = 'UPDATE pets SET ';
  const values = [];
  const updates = [];
  
  if (name) {
    updates.push('name = ?');
    values.push(name);
  }
  
  if (species) {
    updates.push('species = ?');
    values.push(species);
  }
  
  if (breed) {
    updates.push('breed = ?');
    values.push(breed);
  }
  
  if (age) {
    updates.push('age = ?');
    values.push(age);
  }
  
  if (gender) {
    updates.push('gender = ?');
    values.push(gender);
  }
  
  if (weight) {
    updates.push('weight = ?');
    values.push(weight);
  }
  
  if (color) {
    updates.push('color = ?');
    values.push(color);
  }
  
  if (microchip_id) {
    updates.push('microchip_id = ?');
    values.push(microchip_id);
  }
  
  if (owner_id) {
    updates.push('owner_id = ?');
    values.push(owner_id);
  }
  
  if (notes) {
    updates.push('notes = ?');
    values.push(notes);
  }
  
  // Add last updated timestamp
  updates.push('updated_at = CURRENT_TIMESTAMP');
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  query += updates.join(', ') + ' WHERE id = ?';
  values.push(petId);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating pet:', err);
      return res.status(500).json({ error: 'Error updating pet: ' + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    // Return the updated pet data
    db.query('SELECT * FROM pets WHERE id = ?', [petId], (err, pets) => {
      if (err || pets.length === 0) {
        return res.status(200).json({ 
          message: 'Pet updated successfully' 
        });
      }
      
      res.status(200).json({ 
        ...pets[0],
        message: 'Pet updated successfully' 
      });
    });
  });
};

// Delete a pet
const deletePet = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  
  db.query('DELETE FROM pets WHERE id = ?', [petId], (err, result) => {
    if (err) {
      console.error('Error deleting pet:', err);
      return res.status(500).json({ error: 'Error deleting pet: ' + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.status(200).json({ 
      id: petId,
      message: 'Pet deleted successfully'
    });
  });
};

export default {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
};
