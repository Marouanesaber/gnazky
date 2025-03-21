
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const db = req.db;
  const { name, email, password } = req.body;
  
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    
    // Check if user already exists
    const [existingUsers] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user
    const query = `INSERT INTO users (name, email, password, profile_picture) 
                  VALUES (?, ?, ?, ?)`;
    
    const defaultProfilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
    
    const [result] = await db.promise().query(query, [name, email, hashedPassword, defaultProfilePic]);
    
    res.status(201).json({ 
      id: result.insertId,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const db = req.db;
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const user = users[0];
    
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
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  const db = req.db;
  const userId = req.query.userId;
  
  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const [users] = await db.promise().query('SELECT id, name, email, profile_picture FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(users[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const db = req.db;
  const { userId, name, email, profilePicture } = req.body;
  
  try {
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
    
    const [result] = await db.promise().query(query, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
});

export default router;
