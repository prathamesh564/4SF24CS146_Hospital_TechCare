const db = require('../database/db');

async function createUser(name, email, password, role = 'patient') {
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  const result = await db.run(sql, [name, email, password, role]);
  return { id: result.lastID, name, email, role };
}

async function findUserByEmail(email) {
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
}

async function findUserById(id) {
  return db.get('SELECT * FROM users WHERE id = ?', [id]);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};