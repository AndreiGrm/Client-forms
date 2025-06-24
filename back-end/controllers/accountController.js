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

// Ottieni tutti gli account
exports.getAccounts = (req, res) => {
  const db = readDb();
  res.json(db.accounts || []);
};

// Ottieni un account per id
exports.getAccountById = (req, res) => {
  const db = readDb();
  const account = (db.accounts || []).find(acc => String(acc.id) === req.params.id);
  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

// Crea un nuovo account
exports.createAccount = (req, res) => {
  const db = readDb();
  const newAccount = req.body;
  newAccount.id = Date.now().toString();
  db.accounts = db.accounts || [];
  db.accounts.push(newAccount);
  writeDb(db);
  res.status(201).json(newAccount);
};

// Aggiorna un account
exports.updateAccount = (req, res) => {
  const db = readDb();
  const idx = (db.accounts || []).findIndex(acc => String(acc.id) === req.params.id);
  if (idx !== -1) {
    db.accounts[idx] = { ...db.accounts[idx], ...req.body };
    writeDb(db);
    res.json(db.accounts[idx]);
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

// Elimina un account
exports.deleteAccount = (req, res) => {
  const db = readDb();
  const accounts = db.accounts || [];
  const idx = accounts.findIndex(acc => String(acc.id) === req.params.id);
  if (idx !== -1) {
    const deleted = accounts.splice(idx, 1);
    db.accounts = accounts;
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};