const mongoose = require('mongoose');

const MissionTermineesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    objectif: String,
    adresse: String,
    datedebut: Date,
    typemission: String,
    controller: { type: mongoose.Schema.Types.ObjectId, ref: 'AgentMission', required: true }, 
    intervenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Intervenant' }],
    equipements: [{
        equipementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipement', required: true },
        quantiteUtilisee: { type: Number, default: 0 }
    }],    
    resultat: { type: String, enum: ['Success', 'Abandoned', 'Failed'], required: true },
    cause: String,
    Responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'AgentMission' },
    dateFin: { 
        type: Date,
        required: function() { 
            // Le champ dateFin est requis si le résultat n'est pas "Abandonné"
            return this.resultat !== 'Abandoned'; 
        }
    },
    heureFin: { 
        type: String,
        required: function() { 
            // Le champ heureFin est requis si le résultat n'est pas "Abandonné"
            return this.resultat !== 'Abandoned'; 
        }
    },
    rate: { 
        type: Number,
        required: function() { 
            // Le champ rate est requis si le résultat n'est pas "Abandonné"
            return this.resultat !== 'Abandoned'; 
        }
    },
    heuredebut: { type: String, required: true },
    intervenantWatches: [{
        intervenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intervenant', required: true },
        watch: { type: mongoose.Schema.Types.ObjectId, ref: 'Montre', required: true }
    }]
});

const MissionTerminee = mongoose.model('MissionTerminee', MissionTermineesSchema);

module.exports = MissionTerminee;