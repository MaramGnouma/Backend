const mongoose = require('mongoose');

const montreSchema = new mongoose.Schema({

    nom: { type: String, required: true }, 
    modele: { type: String, required: true },
    os: { type: String, required: true },
    size: { type: String, required: true },
    connectivity: { type: String, required: true },
    batteryLife: { type: String, required: true },
    fonctionnalites: { type: String, required: false }, 
    photo: { type: String, required: false },
    marque: { type: String, required: true },
    affichage: { type: String, required: false },
    
    quantite: { type: Number, required: false }, 
    description: { type: String, required: false }, 
    disponible: { type: Boolean, required: false },  
});

module.exports = mongoose.model('Montre', montreSchema);
