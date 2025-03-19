
// Owners controller

// Get all owners
exports.getAllOwners = (req, res) => {
  const db = req.db;
  
  db.query('SELECT * FROM owners', (err, results) => {
    if (err) {
      console.error('Error fetching owners:', err);
      return res.status(500).json({ error: 'Error fetching owners' });
    }
    
    res.status(200).json(results);
  });
};

// Get a single owner by ID
exports.getOwnerById = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  
  db.query('SELECT * FROM owners WHERE id = ?', [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching owner:', err);
      return res.status(500).json({ error: 'Error fetching owner' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    res.status(200).json(results[0]);
  });
};

// Get all pets owned by an owner
exports.getOwnerPets = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  
  db.query('SELECT * FROM pets WHERE owner_id = ?', [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching owner pets:', err);
      return res.status(500).json({ error: 'Error fetching owner pets' });
    }
    
    res.status(200).json(results);
  });
};

// Create a new owner
exports.createOwner = (req, res) => {
  const db = req.db;
  const { name, email, phone, address } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Required fields: name, email, phone' });
  }
  
  const query = `INSERT INTO owners (name, email, phone, address) 
                VALUES (?, ?, ?, ?)`;
  
  db.query(query, [name, email, phone, address], (err, result) => {
    if (err) {
      console.error('Error creating owner:', err);
      return res.status(500).json({ error: 'Error creating owner' });
    }
    
    res.status(201).json({ id: result.insertId, message: 'Owner created successfully' });
  });
};

// Update an owner
exports.updateOwner = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  const { name, email, phone, address } = req.body;
  
  // Build the query based on provided fields
  let query = 'UPDATE owners SET ';
  const values = [];
  const updates = [];
  
  if (name) {
    updates.push('name = ?');
    values.push(name);
  }
  
  if (email) {
    updates.push('email = ?');
    values.push(email);
  }
  
  if (phone) {
    updates.push('phone = ?');
    values.push(phone);
  }
  
  if (address) {
    updates.push('address = ?');
    values.push(address);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  query += updates.join(', ') + ' WHERE id = ?';
  values.push(ownerId);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating owner:', err);
      return res.status(500).json({ error: 'Error updating owner' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    res.status(200).json({ message: 'Owner updated successfully' });
  });
};

// Delete an owner
exports.deleteOwner = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  
  db.query('DELETE FROM owners WHERE id = ?', [ownerId], (err, result) => {
    if (err) {
      console.error('Error deleting owner:', err);
      return res.status(500).json({ error: 'Error deleting owner' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    res.status(200).json({ message: 'Owner deleted successfully' });
  });
};
