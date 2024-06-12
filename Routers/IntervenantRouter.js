const express = require('express');
const  IntervenantController= require('../Controllers/IntervenantController');

const router2 = express.Router();
const intervenantcontroller = new IntervenantController();

// Endpoint pour créer un nouveau contrôleur
router2.post('/soldats', async (req, res) => {
  await intervenantcontroller.createIntervenant(req,res);
});

// Endpoint pour récupérer tous les contrôleurs
router2.get('/soldats', async (req, res) => {
  await intervenantcontroller.getIntervenants(req, res);
});

// Endpoint pour récupérer un contrôleur par ID
router2.get('/soldats/:id', async (req, res) => {
  await intervenantcontroller.getIntervenantById(req, res);
});

// Endpoint pour mettre à jour un contrôleur
router2.put('/soldats/:id', async (req, res) => {
  await intervenantcontroller.updateIntervenant(req, res);
});

// Endpoint pour supprimer un contrôleur
router2.delete('/soldats/:id', async (req, res) => {
  await intervenantcontroller.deleteIntervenant(req, res);
});

router2.get('/soldats/name/:name', async (req, res) => {
  await intervenantcontroller.getIntervenantByName(req, res);
});
module.exports = router2;
