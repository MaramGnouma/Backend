const express = require('express');
const NotificationController = require('../Controllers/NotificationController');

const router = express.Router();
const notificationController = new NotificationController();

// Endpoint pour créer une nouvelle notification
router.post('/notifications', async (req, res) => {
  await notificationController.createNotification(req, res);
});

// Endpoint pour récupérer toutes les notifications (avec des filtres optionnels)
router.get('/notifications', async (req, res) => {
  await notificationController.getNotifications(req, res);
});

// Endpoint pour récupérer une notification par ID
router.get('/notifications/:id', async (req, res) => {
  await notificationController.getNotificationById(req, res);
});

// Endpoint pour mettre à jour une notification
router.put('/notifications/:id', async (req, res) => {
  await notificationController.updateNotification(req, res);
});

// Endpoint pour supprimer une notification
router.delete('/notifications/:id', async (req, res) => {
  await notificationController.deleteNotification(req, res);
});

module.exports = router;
