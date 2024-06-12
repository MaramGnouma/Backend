const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
   name: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    adresse: { type: String, required: true },
    aboutMe: { type: String, required: true },
    password: { type: String, required: false },
});

// Middleware to derive firstname and lastname from username
adminSchema.pre('save', function(next) {
    const name = this.name.split(' ');
    this.firstname = name[0];
    this.lastname = name.slice(1).join(' ');

        // Extract city, country, and codepostal from adresse
        const addressParts = this.adresse.split(',');
        this.city = addressParts[0].trim();
        this.country = addressParts[1].trim();
        this.codepostal = parseInt(addressParts[2].trim()); // Convert codepostal to number
    next();
});

module.exports = mongoose.model('Administrateur', adminSchema);
