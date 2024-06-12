const express = require('express');
const MissionTController = require('../Controllers/MissionTermineeController');

const router = express.Router();
const missiontController = new MissionTController();
// Endpoint pour récupérer toutes les missions
router.get('/missionsT', async (req, res) => {
  await missiontController.getMissionsTerminnes(req, res);
});

// Endpoint pour récupérer une mission par ID
router.get('/missionsT/:id', async (req, res) => {
  await missiontController.getMissionById(req, res);
});
router.delete('/deletemissionsT/:missionId', async (req, res) => {
  await missiontController.deleteMission(req, res);
});
router.get('/users/missionsT/:userId', async (req, res) => {
    await missiontController.getMissionsTByUser(req, res);
  });
router.put('/missions/:id', async (req, res) => {
    await missiontController.updateMissionT(req, res);
  });
router.get('/missionsT/eq/:missionid', async (req, res) => {
    await missiontController.statistiquesUtilisationEquipements(req, res);
  });
router.get('/missionsT/soldats/:missionId', async (req, res) => {
    await missiontController.getIntervenantsFromMission(req, res);
  });
  
  router.post('/generatereport/:missionId', async (req, res) => {
    try {
        await missiontController.generateMissionReport(req, res);
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la génération du rapport PDF.');
    }
});

module.exports = router;
