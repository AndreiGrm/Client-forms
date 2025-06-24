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

// Ottieni tutte le aziende
exports.getCompanies = (req, res) => {
  const db = readDb();
  res.json(db.companies || []);
};

// Ottieni un'azienda per id
exports.getCompanyById = (req, res) => {
  const db = readDb();
  const company = (db.companies || []).find(c => String(c.id) === req.params.id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
};

// Crea una nuova azienda
exports.createCompany = (req, res) => {
  const db = readDb();
  const newCompany = req.body;
  newCompany.id = Date.now().toString();
  db.companies = db.companies || [];
  db.companies.push(newCompany);
  writeDb(db);
  res.status(201).json(newCompany);
};

// Aggiorna un'azienda
exports.updateCompany = (req, res) => {
  const db = readDb();
  const idx = (db.companies || []).findIndex(c => String(c.id) === req.params.id);
  if (idx !== -1) {
    db.companies[idx] = { ...db.companies[idx], ...req.body };
    writeDb(db);
    res.json(db.companies[idx]);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
};

// Elimina un'azienda
exports.deleteCompany = (req, res) => {
  const db = readDb();
  const companies = db.companies || [];
  const idx = companies.findIndex(c => String(c.id) === req.params.id);
  if (idx !== -1) {
    const deleted = companies.splice(idx, 1);
    db.companies = companies;
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
};