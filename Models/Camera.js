const mongoose = require('mongoose');

const CameraSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: false },
    quantite: { type: Number, required: false },
    disponible: { type: Boolean, required: false },
    description: [{ type: String, required: false }],
    modele: { type: String, required: false },
    technologie: { type: String, required: false },  //technologie
    capteur: { type: String, required: false },
    resolution : { type: String, required: false },
    dimensions: { type: String, required: false }, 

    aliasbrodcast : { type: String, required: false },
});

const Camera = mongoose.model('Camera', CameraSchema);

module.exports = Camera;
