
// Pets controller

// Get all pets
exports.getAllPets = (req, res) => {
  const db = req.db;
  
  db.query('SELECT * FROM pets', (err, results) => {
    if (err) {
      console.error('Error fetching pets:', err);
      return res.status(500).json({ error: 'Error fetching pets' });
    }
    
    res.status(200).json(results);
  });
};

// Get a single pet by ID
exports.getPetById = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  
  db.query('SELECT * FROM pets WHERE id = ?', [petId], (err, results) => {
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
exports.createPet = (req, res) => {
  const db = req.db;
  const { name, species, breed, age, gender, owner_id } = req.body;
  
  if (!name || !species || !owner_id) {
    return res.status(400).json({ error: 'Required fields: name, species, owner_id' });
  }
  
  const query = `INSERT INTO pets (name, species, breed, age, gender, owner_id) 
                VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.query(query, [name, species, breed, age, gender, owner_id], (err, result) => {
    if (err) {
      console.error('Error creating pet:', err);
      return res.status(500).json({ error: 'Error creating pet' });
    }
    
    res.status(201).json({ id: result.insertId, message: 'Pet created successfully' });
  });
};

// Update a pet
exports.updatePet = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  const { name, species, breed, age, gender } = req.body;
  
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
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  query += updates.join(', ') + ' WHERE id = ?';
  values.push(petId);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating pet:', err);
      return res.status(500).json({ error: 'Error updating pet' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.status(200).json({ message: 'Pet updated successfully' });
  });
};

// Delete a pet
exports.deletePet = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  
  db.query('DELETE FROM pets WHERE id = ?', [petId], (err, result) => {
    if (err) {
      console.error('Error deleting pet:', err);
      return res.status(500).json({ error: 'Error deleting pet' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.status(200).json({ message: 'Pet deleted successfully' });
  });
};
