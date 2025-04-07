
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
    
    // Execute the query with proper error handling using the correct column names
    const [rows] = await db.promise().query(`
      SELECT 
        v.id, 
        v.pet_id as petId, 
        v.vaccination_date as date, 
        v.vaccine_type as type, 
        v.administered_by as \`by\`, 
        v.temperature as temp, 
        v.created_at as createdAt, 
        v.updated_at as updatedAt 
      FROM vaccinations v
      ORDER BY v.id DESC
    `).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    console.log('Successfully fetched vaccinations:', rows.length);
    
    // Format date strings to YYYY-MM-DD
    const formattedRows = rows.map(row => ({
      ...row,
      date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : row.date,
    }));
    
    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching vaccinations:', error);
    res.status(500).json({ error: 'Error fetching vaccinations: ' + error.message });
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
        v.id, 
        v.pet_id as petId, 
        v.vaccination_date as date, 
        v.vaccine_type as type, 
        v.administered_by as \`by\`, 
        v.temperature as temp, 
        v.created_at as createdAt, 
        v.updated_at as updatedAt 
      FROM vaccinations v
      WHERE v.id = ?
    `, [id]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Format date string to YYYY-MM-DD
    const formattedVaccination = {
      ...rows[0],
      date: rows[0].date instanceof Date ? rows[0].date.toISOString().split('T')[0] : rows[0].date,
    };
    
    console.log('Successfully fetched vaccination details');
    res.json(formattedVaccination);
  } catch (error) {
    console.error(`Error fetching vaccination with ID ${id}:`, error);
    res.status(500).json({ error: 'Error fetching vaccination: ' + error.message });
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
    
    // Create new vaccination record with correct column names
    const query = `INSERT INTO vaccinations (
      pet_id, 
      vaccination_date, 
      vaccine_type, 
      administered_by, 
      temperature
    ) VALUES (?, ?, ?, ?, ?)`;
    
    const [result] = await db.promise().query(query, [
      petId, 
      date, 
      type, 
      by || 'Admin Admin', 
      temp || ''
    ]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    // Get the newly created vaccination with proper field naming for client
    const [newVaccination] = await db.promise().query(`
      SELECT 
        v.id, 
        v.pet_id as petId, 
        v.vaccination_date as date, 
        v.vaccine_type as type, 
        v.administered_by as \`by\`, 
        v.temperature as temp, 
        v.created_at as createdAt, 
        v.updated_at as updatedAt 
      FROM vaccinations v
      WHERE v.id = ?
    `, [result.insertId]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    // Format date string to YYYY-MM-DD
    const formattedVaccination = {
      ...newVaccination[0],
      date: newVaccination[0].date instanceof Date ? newVaccination[0].date.toISOString().split('T')[0] : newVaccination[0].date,
    };
    
    console.log('Successfully created vaccination record with ID:', result.insertId);
    res.status(201).json(formattedVaccination);
  } catch (error) {
    console.error('Error creating vaccination:', error);
    res.status(500).json({ error: 'Error creating vaccination record: ' + error.message });
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
    const [existing] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    if (existing.length === 0) {
      console.error(`Vaccination with ID ${id} not found`);
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Update vaccination record with correct column names
    const query = `UPDATE vaccinations SET 
                  pet_id = ?,
                  vaccination_date = ?,
                  vaccine_type = ?,
                  administered_by = ?,
                  temperature = ?
                  WHERE id = ?`;
    
    await db.promise().query(query, [
      petId || existing[0].pet_id,
      date || existing[0].vaccination_date,
      type || existing[0].vaccine_type,
      by || existing[0].administered_by,
      temp || existing[0].temperature,
      id
    ]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    // Get the updated vaccination with proper field naming for client
    const [updated] = await db.promise().query(`
      SELECT 
        v.id, 
        v.pet_id as petId, 
        v.vaccination_date as date, 
        v.vaccine_type as type, 
        v.administered_by as \`by\`, 
        v.temperature as temp, 
        v.created_at as createdAt, 
        v.updated_at as updatedAt 
      FROM vaccinations v
      WHERE v.id = ?
    `, [id]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    // Format date string to YYYY-MM-DD
    const formattedVaccination = {
      ...updated[0],
      date: updated[0].date instanceof Date ? updated[0].date.toISOString().split('T')[0] : updated[0].date,
    };
    
    console.log(`Successfully updated vaccination with ID: ${id}`);
    res.json(formattedVaccination);
  } catch (error) {
    console.error(`Error updating vaccination with ID ${id}:`, error);
    res.status(500).json({ error: 'Error updating vaccination record: ' + error.message });
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
    const [existing] = await db.promise().query('SELECT * FROM vaccinations WHERE id = ?', [id]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    if (existing.length === 0) {
      console.error(`Vaccination with ID ${id} not found`);
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    
    // Delete the vaccination
    const [result] = await db.promise().query('DELETE FROM vaccinations WHERE id = ?', [id]).catch(err => {
      console.error('SQL query error:', err);
      throw new Error(`Database query failed: ${err.message}`);
    });
    
    if (result.affectedRows === 0) {
      console.error(`Failed to delete vaccination with ID ${id}`);
      return res.status(500).json({ error: 'Failed to delete vaccination' });
    }
    
    console.log(`Successfully deleted vaccination with ID: ${id}`);
    res.json({ message: 'Vaccination deleted successfully', id });
  } catch (error) {
    console.error(`Error deleting vaccination with ID ${id}:`, error);
    res.status(500).json({ error: 'Error deleting vaccination record: ' + error.message });
  }
};
