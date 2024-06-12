const mongoose = require('mongoose');

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

const intervenantSchema = new mongoose.Schema({
  name: String,
  adresse: String, //adresse
  telephone: String, //telephone
  genre: String,
  datebirth: Date, //dateBirth
  idMilitaire: Number, //idMilitaire
  etatCivil: String,
  email: String,//ne trouve
  image: String,
  cv: String,
  dateEngagement: Date, //dateEngagement
  unitAffectation: String, //unitAffectation
  experiences: [experienceSchema], 
  specializations: [specializationSchema],
  certifications: [certificationSchema],
  competences: [competenceSchema]
});

const Intervenant = mongoose.model('Intervenant', intervenantSchema);

module.exports = Intervenant;
