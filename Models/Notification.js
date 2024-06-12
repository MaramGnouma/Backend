const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  
    sujet: { type: String, required: true },
    date:{ type: Date, required: true },
    heure:{ type: String, required: true },
    lieu:{ type: String, required: true },


    
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
