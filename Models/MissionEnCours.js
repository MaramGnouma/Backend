const mongoose = require('mongoose');

const MissionEnCoursSchema = new mongoose.Schema({
    name: { type: String, required: true },
    objectif: String,
    adresse: String,
    datedebut: Date,
    typemission: String,
    // Modifier la déclaration de users pour un seul utilisateur
    controller: { type: mongoose.Schema.Types.ObjectId, ref: 'AgentMission', required: true }, 
    intervenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Intervenant' }],
    equipements: [{
        equipementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipement', required: true },
        quantiteUtilisee: { type: Number, default: 0 }
    }],
    notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification' },
    Responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'AgentMission' },
    heuredebut: { type: String, required: true },
    camera: { type: mongoose.Schema.Types.ObjectId, ref: 'Camera' },
    intervenantWatches: [{
        intervenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intervenant', required: true },
        watch: { type: mongoose.Schema.Types.ObjectId, ref: 'Montre', required: true }
    }]


});

const MissionEnCours = mongoose.model('MissionEnCours', MissionEnCoursSchema);

module.exports = MissionEnCours;