const express = require('express');
const router = express.Router();
const residenceController = require('../controllers/residenceController');

// GET tutte le residenze
router.get('/', residenceController.getResidences);

// GET una residenza per id
router.get('/:id', residenceController.getResidenceById);

// POST nuova residenza
router.post('/', residenceController.createResidence);

// PUT aggiorna residenza
router.put('/:id', residenceController.updateResidence);

// DELETE elimina residenza
router.delete('/:id', residenceController.deleteResidence);

module.exports = router;