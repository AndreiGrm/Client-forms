const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// GET tutte le aziende
router.get('/', companyController.getCompanies);

// GET un'azienda per id
router.get('/:id', companyController.getCompanyById);

// POST nuova azienda
router.post('/', companyController.createCompany);

// PUT aggiorna azienda
router.put('/:id', companyController.updateCompany);

// DELETE elimina azienda
router.delete('/:id', companyController.deleteCompany);

module.exports = router;