const express = require('express');
const router = express.Router();
const heartbeatController = require('../Controllers/DonneesBiometriquesController');

// Route pour récupérer la dernière fréquence cardiaque
router.get('/last-heart-rate', heartbeatController.getLastHeartRate);

// Route pour récupérer les données de fréquence cardiaque
router.get('/api/heart-rate', heartbeatController.getHeartRateData);

module.exports = router;
