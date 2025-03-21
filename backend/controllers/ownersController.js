
// Owners controller

// Get all owners
const getAllOwners = (req, res) => {
  const db = req.db;
  
  db.query('SELECT * FROM owners ORDER BY name ASC', (err, results) => {
    if (err) {
      console.error('Error fetching owners:', err);
      return res.status(500).json({ error: 'Error fetching owners: ' + err.message });
    }
    
    res.status(200).json(results);
  });
};

// Get a single owner by ID
const getOwnerById = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  
  db.query('SELECT * FROM owners WHERE id = ?', [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching owner:', err);
      return res.status(500).json({ error: 'Error fetching owner: ' + err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    res.status(200).json(results[0]);
  });
};

// Get all pets owned by an owner
const getOwnerPets = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  
  db.query('SELECT * FROM pets WHERE owner_id = ?', [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching owner pets:', err);
      return res.status(500).json({ error: 'Error fetching owner pets: ' + err.message });
    }
    
    res.status(200).json(results);
  });
};

// Create a new owner
const createOwner = (req, res) => {
  const db = req.db;
  const { name, email, phone, address, notes } = req.body;
  const userId = req.user?.id || null; // Get user ID from JWT token if available
  
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Required fields: name, email, phone' });
  }
  
  const query = `INSERT INTO owners (name, email, phone, address, notes, created_by) 
                VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.query(query, [name, email, phone, address, notes, userId], (err, result) => {
    if (err) {
      console.error('Error creating owner:', err);
      return res.status(500).json({ error: 'Error creating owner: ' + err.message });
    }
    
    // Return the newly created owner data
    db.query('SELECT * FROM owners WHERE id = ?', [result.insertId], (err, owners) => {
      if (err || owners.length === 0) {
        return res.status(201).json({ 
          id: result.insertId, 
          message: 'Owner created successfully' 
        });
      }
      
      res.status(201).json({ 
        ...owners[0],
        message: 'Owner created successfully' 
      });
    });
  });
};

// Update an owner
const updateOwner = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  const { name, email, phone, address, notes } = req.body;
  
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
  
  if (notes) {
    updates.push('notes = ?');
    values.push(notes);
  }
  
  // Add updated timestamp
  updates.push('updated_at = CURRENT_TIMESTAMP');
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  query += updates.join(', ') + ' WHERE id = ?';
  values.push(ownerId);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating owner:', err);
      return res.status(500).json({ error: 'Error updating owner: ' + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    // Return the updated owner data
    db.query('SELECT * FROM owners WHERE id = ?', [ownerId], (err, owners) => {
      if (err || owners.length === 0) {
        return res.status(200).json({ 
          message: 'Owner updated successfully' 
        });
      }
      
      res.status(200).json({ 
        ...owners[0],
        message: 'Owner updated successfully' 
      });
    });
  });
};

// Delete an owner
const deleteOwner = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  
  db.query('DELETE FROM owners WHERE id = ?', [ownerId], (err, result) => {
    if (err) {
      console.error('Error deleting owner:', err);
      return res.status(500).json({ error: 'Error deleting owner: ' + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    res.status(200).json({ 
      id: ownerId,
      message: 'Owner deleted successfully'
    });
  });
};

export default {
  getAllOwners,
  getOwnerById,
  getOwnerPets,
  createOwner,
  updateOwner,
  deleteOwner
};
