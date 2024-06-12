const mongoose = require('mongoose');

const EquipementSchema = new mongoose.Schema({

    name: { type: String, required: true },
    photo: { type: String, required: false },

    quantite: { type: Number, required: true },
    disponible: { type: Boolean, required: true },
    armements: [{ type: String, required: false }],
    accessoires: [{ type: String, required: false }],
    desscription: { type: String, required: true },
    dimensions: [
        { type: String, required: false }
    ]


});

const EquipementTerrain = mongoose.model('EquipementTerrain', EquipementSchema);

module.exports = EquipementTerrain;
