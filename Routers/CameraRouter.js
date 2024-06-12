const express = require('express');
const CameraController = require('../Controllers/CameraController');

const router = express.Router();
const cameraController = new CameraController();

// Create a new camera
/**
 * @swagger
 * /cameras:
 *   post:
 *     summary: Crée une nouvelle caméra
 *     description: Crée une nouvelle caméra avec les données fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camera'
 *     responses:
 *       201:
 *         description: Succès, retourne la nouvelle caméra créée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/cameras', async (req, res) => {
  await cameraController.createCamera(req, res);
});

// Get all cameras
/**
 * @swagger
 * /cameras:
 *   get:
 *     summary: Obtient toutes les caméras
 *     description: Récupère la liste de toutes les caméras disponibles.
 *     responses:
 *       200:
 *         description: Succès, retourne la liste des caméras.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/cameras', async (req, res) => {
  await cameraController.getCameras(req, res);
});

// Get a camera by ID
/**
 * @swagger
 * /cameras/{id}:
 *   get:
 *     summary: Obtient une caméra par ID
 *     description: Récupère une caméra spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la caméra à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès, retourne la caméra demandée.
 *       404:
 *         description: Caméra non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/cameras/:id', async (req, res) => {
  await cameraController.getCameraById(req, res);
});

// Update a camera
/**
 * @swagger
 * /cameras/{id}:
 *   put:
 *     summary: Met à jour une caméra existante
 *     description: Met à jour les données d'une caméra spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la caméra à mettre à jour
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camera'
 *     responses:
 *       200:
 *         description: Succès, retourne la caméra mise à jour.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/cameras/:id', async (req, res) => {
  await cameraController.updateCamera(req, res);
});

// Delete a camera
/**
 * @swagger
 * /cameras/{id}:
 *   delete:
 *     summary: Supprime une caméra existante
 *     description: Supprime une caméra spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la caméra à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès, retourne la caméra supprimée.
 *       404:
 *         description: Caméra non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/cameras/:id', async (req, res) => {
  await cameraController.deleteCamera(req, res);
});
router.get('/missions/camera/:missionId', async (req, res) => {
  await cameraController.getCamerasByMissionId(req, res);
});
module.exports = router;
 