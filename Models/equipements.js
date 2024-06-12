const mongoose = require('mongoose');

const EquipementSchema = new mongoose.Schema({
  
    name: { type: String, required: true },
    quantite:{type: String, required: true}
});

const Equipement = mongoose.model('Equipement', EquipementSchema);

module.exports = Equipement;
