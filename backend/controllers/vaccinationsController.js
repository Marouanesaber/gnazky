
// Vaccinations controller

// Get all vaccinations
export const getAllVaccinations = async (req, res) => {
  const db = req.db;
  
  try {
    const [rows] = await db.promise().query('SELECT * FROM vaccinations ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching vaccinations:', error);
    res.status(500).json({ error: 'Error fetching vaccinations' });
  }
};

// Get vaccination by ID
export const getVaccinationById = async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  
  try {
    const [rows] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching vaccination:', error);
    res.status(500).json({ error: 'Error fetching vaccination' });
  }
};

// Create a new vaccination
export const createVaccination = async (req, res) => {
  const db = req.db;
  const { petId, date, type, by, temp } = req.body;
  
  try {
    // Validate required fields
    if (!petId || !date || !type) {
      return res.status(400).json({ error: 'Pet ID, date, and type are required' });
    }
    
    // Create new vaccination record
    const query = `INSERT INTO vaccinations (pet_id, date, type, by, temp) 
                  VALUES (?, ?, ?, ?, ?)`;
    
    const [result] = await db.promise().query(query, [petId, date, type, by || 'Admin Admin', temp || '']);
    
    // Get the newly created vaccination
    const [newVaccination] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [result.insertId]);
    
    res.status(201).json(newVaccination[0]);
  } catch (error) {
    console.error('Error creating vaccination:', error);
    res.status(500).json({ error: 'Error creating vaccination record' });
  }
};

// Update an existing vaccination
export const updateVaccination = async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  const { petId, date, type, by, temp } = req.body;
  
  try {
    // Check if vaccination exists
    const [existing] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Update vaccination record
    const query = `UPDATE vaccinations SET 
                  pet_id = ?,
                  date = ?,
                  type = ?,
                  by = ?,
                  temp = ?
                  WHERE id = ?`;
    
    await db.promise().query(query, [
      petId || existing[0].pet_id,
      date || existing[0].date,
      type || existing[0].type,
      by || existing[0].by,
      temp || existing[0].temp,
      id
    ]);
    
    // Get the updated vaccination
    const [updated] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]);
    
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating vaccination:', error);
    res.status(500).json({ error: 'Error updating vaccination record' });
  }
};

// Delete a vaccination
export const deleteVaccination = async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  
  try {
    // Check if vaccination exists
    const [existing] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Delete the vaccination
    await db.promise().query('DELETE FROM vaccinations WHERE id = ?', [id]);
    
    res.json({ message: 'Vaccination deleted successfully', id });
  } catch (error) {
    console.error('Error deleting vaccination:', error);
    res.status(500).json({ error: 'Error deleting vaccination record' });
  }
};
