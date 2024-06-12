const mongoose = require('mongoose');

const DonneesBiometriquesSchema = new mongoose.Schema({
  bpm: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const DonneesBiometriques = mongoose.model('DonneesBiometriques', DonneesBiometriquesSchema);

module.exports = DonneesBiometriques;
