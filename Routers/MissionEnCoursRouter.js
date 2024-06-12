const express = require('express');
const MissionController = require('../Controllers/MissionEnCoursController');

const router = express.Router();
const missionController = new MissionController();

/**
 * @swagger
 * /missions:
 *   post:
 *     summary: Créer une nouvelle mission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mission'
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/missions', async (req, res) => {
  await missionController.createMission(req, res);
});

/**
 * @swagger
 * /missions:
 *   get:
 *     summary: Récupérer toutes les missions
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/missions', async (req, res) => {
  await missionController.getMissions(req, res);
});

/**
 * @swagger
 * /missions/equipement/{missionId}:
 *   get:
 *     summary: Récupérer tous les équipements avec quantité et statut pour une mission donnée
 *     parameters:
 *       - in: path
 *         name: missionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mission
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/missions/equipement/:missionId', async (req, res) => {
  await missionController.getAllEquipmentsWithQuantityAndStatus(req, res);
});

/**
 * @swagger
 * /missions/{id}:
 *   get:
 *     summary: Récupérer une mission par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mission
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/missions/:id', async (req, res) => {
  await missionController.getMissionById(req, res);
});

/**
 * @swagger
 * /deletemissions/{id}:
 *   delete:
 *     summary: Supprimer une mission par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mission
 *     responses:
 *       '200':
 *         description: OK
 */
router.delete('/deletemissions/:id', async (req, res) => {
  await missionController.deleteMission(req, res);
});

/**
 * @swagger
 * /mission-types/count:
 *   get:
 *     summary: Obtenir le nombre de types de mission
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/mission-types/count', async (req, res) => {
  await missionController.getCountMissionTypes(req, res);
});

/**
 * @swagger
 * /missionsT:
 *   get:
 *     summary: Récupérer les missions terminées
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/missionsT', async (req, res) => {
  await missionController.getMissionsTerminnes(req, res);
});

/**
 * @swagger
 * /missions/{missionId}/result:
 *   put:
 *     summary: Mettre à jour le résultat d'une mission
 *     parameters:
 *       - in: path
 *         name: missionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MissionResult'
 *     responses:
 *       '200':
 *         description: OK
 */
router.put('/missions/:missionId/result', async (req, res) => {
  await missionController.updateMissionResult(req, res);
});

/**
 * @swagger
 * /missions/{missionId}:
 *   put:
 *     summary: Mettre à jour une mission
 *     parameters:
 *       - in: path
 *         name: missionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mission'
 *     responses:
 *       '200':
 *         description: OK
 */
router.put('/missions/:missionId', async (req, res) => {
  await missionController.updateMission(req, res);
});

/**
 * @swagger
 * /users/missions/{userId}:
 *   get:
 *     summary: Récupérer les missions d'un utilisateur par ID d'utilisateur
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/users/missions/:id', async (req, res) => {
  await missionController.getMissionsByUser(req, res);
});
router.get('/:missionId/intervenants', async (req, res) => {
  await missionController.getIntervenantsByMissionId(req, res);
});
module.exports = router;
