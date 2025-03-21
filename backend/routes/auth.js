
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const db = req.db;
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  
  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error checking user existence:', err);
      return res.status(500).json({ error: 'Error during registration' });
    }
    
    if (results.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Create new user
      const query = `INSERT INTO users (name, email, password, profile_picture) 
                    VALUES (?, ?, ?, ?)`;
      
      const defaultProfilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
      
      db.query(query, [name, email, hashedPassword, defaultProfilePic], (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).json({ error: 'Error during registration' });
        }
        
        res.status(201).json({ 
          id: result.insertId,
          message: 'User registered successfully'
        });
      });
      
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Error during registration' });
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const db = req.db;
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Error during login' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const user = results[0];
    
    try {
      // Compare password with hashed password in DB
      const match = await bcrypt.compare(password, user.password);
      
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Return user info (excluding password)
      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profile_picture
      };
      
      res.status(200).json({ 
        message: 'Login successful',
        user: userInfo
      });
      
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Error during login' });
    }
  });
});

// Get user profile
router.get('/profile', (req, res) => {
  const db = req.db;
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  db.query('SELECT id, name, email, profile_picture FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({ error: 'Error fetching profile' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(results[0]);
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  const db = req.db;
  const { userId, name, email, profilePicture } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  // Build the query based on provided fields
  let query = 'UPDATE users SET ';
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
  
  if (profilePicture) {
    updates.push('profile_picture = ?');
    values.push(profilePicture);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  query += updates.join(', ') + ' WHERE id = ?';
  values.push(userId);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Error updating profile' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

export default router;
