const express = require('express');
const EquipementController = require('../Controllers/equipementController');

const router = express.Router();
const equipementController = new EquipementController();

// Create a new equipement
router.post('/equipements', async (req, res) => {
  await equipementController.createEquipement(req, res);
});

// Get all equipements
router.get('/equipements', async (req, res) => {
  await equipementController.getEquipements(req, res);
});

// Get a equipement by ID
router.get('/equipements/:id', async (req, res) => {
  await equipementController.getEquipementById(req, res);
});

router.put('/equipements/:id', async (req, res) => {
  await equipementController.updateEquipement(req, res);
});

// Supprimer un équipement
router.delete('/equipements/:id', async (req, res) => {
  await equipementController.deleteEquipement(req, res);
});
module.exports = router;
