const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// GET tutti gli account
router.get('/', accountController.getAccounts);

// GET un account per id
router.get('/:id', accountController.getAccountById);

// POST nuovo account
router.post('/', accountController.createAccount);

// PUT aggiorna account
router.put('/:id', accountController.updateAccount);

// DELETE elimina account
router.delete('/:id', accountController.deleteAccount);

module.exports = router;