const mongoose = require('mongoose');
const Notification = require('../Models/Notification');

class NotificationService {
  constructor() {}
  async createNotification(subject, date, time, location) {
    try {
      // Convert date to a string with the desired format (YYYY-MM-DD)
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-'); // Replace slashes with dashes if needed
  
      // Create a new Notification object with all required fields
      const newNotification = new Notification({
        sujet: subject,
        date: formattedDate,
        heure: time,
        lieu: location
      });
  
      // Save the new notification to the database
      const savedNotification = await newNotification.save();
      return savedNotification;
    } catch (error) {
      throw error;
    }
  }
  
  
  
  async getNotifications(filters = {}) {
    try {
      const notifications = await Notification.find(filters);
      return notifications;
    } catch (error) {
      throw error;
    }
  }

  async getNotificationById(id) {
    try {
      const notification = await Notification.findById(id);
      return notification;
    } catch (error) {
      throw error;
    }
  }

  async updateNotification(id, notificationData) {
    try {
      const updatedNotification = await Notification.findByIdAndUpdate(
        id,
        notificationData,
        { new: true } // Return the updated document
      );
      return updatedNotification;
    } catch (error) {
      throw error;
    }
  }

  async deleteNotification(id) {
    try {
      await Notification.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NotificationService();

