const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

// Helper per leggere il db
function readDb() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

// Helper per scrivere nel db
function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// Ottieni tutti gli utenti
exports.getUsers = (req, res) => {
  const db = readDb();
  res.json(db.users || []);
};

// Ottieni un utente per id
exports.getUserById = (req, res) => {
  const db = readDb();
  const user = (db.users || []).find(u => String(u.id) === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Crea un nuovo utente
exports.createUser = (req, res) => {
  const db = readDb();
  const newUser = req.body;
  newUser.id = Date.now().toString();
  db.users = db.users || [];
  db.users.push(newUser);
  writeDb(db);
  res.status(201).json(newUser);
};

// Aggiorna un utente
exports.updateUser = (req, res) => {
  const db = readDb();
  const idx = (db.users || []).findIndex(u => String(u.id) === req.params.id);
  if (idx !== -1) {
    db.users[idx] = { ...db.users[idx], ...req.body };
    writeDb(db);
    res.json(db.users[idx]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Elimina un utente
exports.deleteUser = (req, res) => {
  const db = readDb();
  const users = db.users || [];
  const idx = users.findIndex(u => String(u.id) === req.params.id);
  if (idx !== -1) {
    const deleted = users.splice(idx, 1);
    db.users = users;
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};