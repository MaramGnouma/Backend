const NotificationService = require('../Services/NotificationService');

class NotificationController {
  constructor() {
    this.notificationService = NotificationService;
  }

  async createNotification(req, res) {
    try {
      const { sujet } = req.body;
      const newNotification = await this.notificationService.createNotification(sujet);
      res.status(201).json(newNotification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création de la notification' });
    }
  }

  async getNotifications(req, res) {
    try {
      const filters = req.query;
      const notifications = await this.notificationService.getNotifications(filters);
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des notifications' });
    }
  }

  async getNotificationById(req, res) {
    try {
      const notification = await this.notificationService.getNotificationById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification non trouvée' });
      }
      res.json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la notification' });
    }
  }

  async updateNotification(req, res) {
    try {
      const updatedNotification = await this.notificationService.updateNotification(req.params.id, req.body);
      res.json(updatedNotification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification' });
    }
  }

  async deleteNotification(req, res) {
    try {
      await this.notificationService.deleteNotification(req.params.id);
      res.json({ message: 'Notification supprimée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la notification' });
    }
  }
}

module.exports = NotificationController;
