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

// Ottieni tutte le residenze
function getResidences(req, res) {
  const db = readDb();
  res.json(db.residences || []);
}

// Ottieni una residenza per id
function getResidenceById(req, res) {
  const db = readDb();
  const residence = (db.residences || []).find(r => String(r.id) === req.params.id);
  if (residence) {
    res.json(residence);
  } else {
    res.status(404).json({ message: 'Residence not found' });
  }
}

// Crea una nuova residenza
function createResidence(req, res) {
  const db = readDb();
  const newResidence = req.body;
  newResidence.id = Date.now().toString();
  db.residences = db.residences || [];
  db.residences.push(newResidence);
  writeDb(db);
  res.status(201).json(newResidence);
}

// Aggiorna una residenza
function updateResidence(req, res) {
  const db = readDb();
  const idx = (db.residences || []).findIndex(r => String(r.id) === req.params.id);
  if (idx !== -1) {
    db.residences[idx] = { ...db.residences[idx], ...req.body };
    writeDb(db);
    res.json(db.residences[idx]);
  } else {
    res.status(404).json({ message: 'Residence not found' });
  }
}

// Elimina una residenza
function deleteResidence(req, res) {
  const db = readDb();
  const residences = db.residences || [];
  const idx = residences.findIndex(r => String(r.id) === req.params.id);
  if (idx !== -1) {
    const deleted = residences.splice(idx, 1);
    db.residences = residences;
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Residence not found' });
  }
}

module.exports = {
  getResidences,
  getResidenceById,
  createResidence,
  updateResidence,
  deleteResidence
};