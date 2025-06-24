const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET tutti gli utenti
router.get('/', userController.getUsers);

// GET un utente per id
router.get('/:id', userController.getUserById);

// POST nuovo utente
router.post('/', userController.createUser);

// PUT aggiorna utente
router.put('/:id', userController.updateUser);

// DELETE elimina utente
router.delete('/:id', userController.deleteUser);

module.exports = router;