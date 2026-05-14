const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory database
const users = [];

/*
====================================
REGISTER
POST /auth/register
====================================
*/

router.post('/register', async (req, res) => {

  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email and password are required.'
    });
  }

  // Check existing user
  const existingUser = users.find(
    user => user.email === email
  );

  if (existingUser) {
    return res.status(409).json({
      message: 'User already exists.'
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User registered successfully!'
  });

});

/*
====================================
LOGIN
POST /auth/login
====================================
*/

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  // Find user
  const user = users.find(
    user => user.email === email
  );

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password.'
    });
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      message: 'Invalid email or password.'
    });
  }

  // Create token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

  res.json({
    message: 'Login successful!',
    token
  });

});

/*
====================================
GET USERS
GET /auth/users
====================================
*/

router.get('/users', (req, res) => {

  // Hide passwords
  const safeUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));

  res.json(safeUsers);

});

module.exports = router;