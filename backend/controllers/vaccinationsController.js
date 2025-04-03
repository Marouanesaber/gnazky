
// Vaccinations controller

// Get all vaccinations
export const getAllVaccinations = async (req, res) => {
  const db = req.db;
  
  try {
    console.log('Attempting to fetch vaccinations from database...');
    
    // Check if we have a valid database connection
    if (!db) {
      console.error('Database connection not available');
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await db.promise().query(`
      SELECT 
        id, 
        pet_id as petId, 
        date, 
        type, 
        by, 
        temp, 
        created_at as createdAt, 
        updated_at as updatedAt 
      FROM vaccinations 
      ORDER BY id DESC
    `);
    
    console.log('Successfully fetched vaccinations:', rows.length);
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
    console.log(`Fetching vaccination with ID: ${id}`);
    
    // Check if we have a valid database connection
    if (!db) {
      console.error('Database connection not available');
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const [rows] = await db.promise().query(`
      SELECT 
        id, 
        pet_id as petId, 
        date, 
        type, 
        by, 
        temp, 
        created_at as createdAt, 
        updated_at as updatedAt 
      FROM vaccinations 
      WHERE id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    console.log('Successfully fetched vaccination details');
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error fetching vaccination with ID ${id}:`, error);
    res.status(500).json({ error: 'Error fetching vaccination' });
  }
};

// Create a new vaccination
export const createVaccination = async (req, res) => {
  const db = req.db;
  const { petId, date, type, by, temp } = req.body;
  
  try {
    console.log('Creating new vaccination record with data:', { petId, date, type, by, temp });
    
    // Check if we have a valid database connection
    if (!db) {
      console.error('Database connection not available');
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // Validate required fields
    if (!petId || !date || !type) {
      console.error('Validation error: Missing required fields');
      return res.status(400).json({ error: 'Pet ID, date, and type are required' });
    }
    
    // Create new vaccination record - use pet_id for database column
    const query = `INSERT INTO vaccinations (pet_id, date, type, by, temp) 
                  VALUES (?, ?, ?, ?, ?)`;
    
    const [result] = await db.promise().query(query, [petId, date, type, by || 'Admin Admin', temp || '']);
    
    // Get the newly created vaccination and convert pet_id to petId for client
    const [newVaccination] = await db.promise().query(`
      SELECT 
        id, 
        pet_id as petId, 
        date, 
        type, 
        by, 
        temp, 
        created_at as createdAt, 
        updated_at as updatedAt 
      FROM vaccinations 
      WHERE id = ?
    `, [result.insertId]);
    
    console.log('Successfully created vaccination record with ID:', result.insertId);
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
    console.log(`Updating vaccination with ID: ${id}`);
    
    // Check if we have a valid database connection
    if (!db) {
      console.error('Database connection not available');
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // Check if vaccination exists
    const [existing] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      console.error(`Vaccination with ID ${id} not found`);
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Update vaccination record - remember pet_id is the database column name
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
    
    // Get the updated vaccination with proper field naming for client
    const [updated] = await db.promise().query(`
      SELECT 
        id, 
        pet_id as petId, 
        date, 
        type, 
        by, 
        temp, 
        created_at as createdAt, 
        updated_at as updatedAt 
      FROM vaccinations 
      WHERE id = ?
    `, [id]);
    
    console.log(`Successfully updated vaccination with ID: ${id}`);
    res.json(updated[0]);
  } catch (error) {
    console.error(`Error updating vaccination with ID ${id}:`, error);
    res.status(500).json({ error: 'Error updating vaccination record' });
  }
};

// Delete a vaccination
export const deleteVaccination = async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  
  try {
    console.log(`Attempting to delete vaccination with ID: ${id}`);
    
    // Check if we have a valid database connection
    if (!db) {
      console.error('Database connection not available');
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    // Check if vaccination exists
    const [existing] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      console.error(`Vaccination with ID ${id} not found`);
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Delete the vaccination
    const [result] = await db.promise().query('DELETE FROM vaccinations WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      console.error(`Failed to delete vaccination with ID ${id}`);
      return res.status(500).json({ error: 'Failed to delete vaccination' });
    }
    
    console.log(`Successfully deleted vaccination with ID: ${id}`);
    res.json({ message: 'Vaccination deleted successfully', id });
  } catch (error) {
    console.error(`Error deleting vaccination with ID ${id}:`, error);
    res.status(500).json({ error: 'Error deleting vaccination record' });
  }
};
