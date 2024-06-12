const express = require('express');
const statistiqueController = require('../Controllers/StatistiqueController');

const router = express.Router();

/**
 * @swagger
 * /byType:
 *   get:
 *     summary: Obtenir des statistiques de mission par type
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/byType', async (req, res) => {
  await statistiqueController.getMissionStatsByType(req, res);
});

/**
 * @swagger
 * /byResult:
 *   get:
 *     summary: Obtenir des statistiques de mission par résultat et année
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/byResult', async (req, res) => {
  await statistiqueController.getMissionStatsByResultAndYear(req, res);
});

/**
 * @swagger
 * /byResponsable:
 *   get:
 *     summary: Obtenir des statistiques de mission par responsable et résultat
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/byResponsable', async (req, res) => {
  await statistiqueController.getMissionStatsByResponsableAndResult(req, res);
});

/**
 * @swagger
 *  /byduree:
 *   get:
 *     summary: Obtenir la durée moyenne des missions
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/byduree', async (req, res) => {
  await statistiqueController.getAverageMissionDuration(req, res);
});

/**
 * @swagger
 * /byperiod:
 *   get:
 *     summary: Obtenir la distribution des résultats par période
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/byperiod', async (req, res) => {
  await statistiqueController.getResultsDistributionByPeriod(req, res);
});

/**
 * @swagger
 * /byrate:
 *   get:
 *     summary: Obtenir le taux de réussite moyen par type de mission
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/byrate', async (req, res) => {
  await statistiqueController.getAverageSuccessRateByType(req, res);
});

module.exports = router;
