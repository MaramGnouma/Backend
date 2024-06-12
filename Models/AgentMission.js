const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const experienceSchema = new mongoose.Schema({
    type: String,
    annee: Date
  });
  
  const specializationSchema = new mongoose.Schema({
    name: String,
    niveau: String
  });
  
  const certificationSchema = new mongoose.Schema({
    nom: String,
    dateObtention: Date
  });
  
  const competenceSchema = new mongoose.Schema({
    nom: String,
    niveau: String
  });
const AgentSchema = new mongoose.Schema({
  name: String,
  genre: String,
  datebirth: Date, //dateBirth
  idMilitaire: Number, //idMilitaire
  adresse: String, //adresse
  telephone: String, //telephone
  etatCivil: String,
  email: String,
  image: String,
  cv: String,
  dateEngagement: Date, //dateEngagement
  unitAffectation: String, //unitAfectation
  experiences: [experienceSchema],
  specializations: [specializationSchema],
  certifications: [certificationSchema],
  competences: [competenceSchema],
    role: { type: String, enum: ['Supervisor', 'Controller'], required: true },
    status: { type: String, enum: ['Pending', 'Accepted'], default: 'Pending' },
    password: { type: String, required: true },
notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }] ,
    // Le champ photo est facultatif, donc il est défini comme required: false
});
const AgentMission = mongoose.model('AgentMission', AgentSchema);

module.exports = AgentMission;