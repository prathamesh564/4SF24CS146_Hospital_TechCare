const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findUserById(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed.' });
  }
}

module.exports = {
  authenticate,
};