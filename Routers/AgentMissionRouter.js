const express = require('express');
const router = express.Router();
const AgentMissionController = require('../Controllers/AgentMissionController');

// Route pour créer un nouvel utilisateur
router.post('/agents', async (req, res) => {
    await AgentMissionController.createUser(req, res);
});

// Route pour accepter un utilisateur en attente
router.patch('/agents/:id/accept', async (req, res) => {
    await AgentMissionController.acceptUser(req, res);
});

// Route pour obtenir tous les utilisateurs
router.get('/agents', async (req, res) => {
    await AgentMissionController.getAllUsers(req, res);
});

// Route pour supprimer un utilisateur
router.delete('/agents/:id', async (req, res) => {
    await AgentMissionController.deleteUser(req, res);
});

// Route pour mettre à jour un utilisateur
router.put('/agents/:id', async (req, res) => {
    await AgentMissionController.updateUser(req, res);
});

// Route pour obtenir un utilisateur par son ID
router.get('/agents/:id', async (req, res) => {
    await AgentMissionController.getUserById(req, res);
});

// Route pour obtenir des utilisateurs par rôle
router.get('/agents/role/:role', async (req, res) => {
    await AgentMissionController.getUsersByRole(req, res);
});

// Route pour rechercher un utilisateur par son nom
router.get('/agents/name/:name', async (req, res) => {
    await AgentMissionController.getUserByName(req, res);
});

// Route pour obtenir les notifications d'un utilisateur par son ID
router.get('/agents/notifications/:id', async (req, res) => {
    await AgentMissionController.getUserNotifications(req, res);
});

// Route pour obtenir les missions associées à un utilisateur par son ID
router.get('/agents/:id/missions', async (req, res) => {
    await AgentMissionController.getMissionsByUser(req, res);
});

module.exports = router;
