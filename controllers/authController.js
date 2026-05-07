const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name, email, hashedPassword, role);
    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '8h',
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed.' });
  }
}

module.exports = {
  register,
  login,
};