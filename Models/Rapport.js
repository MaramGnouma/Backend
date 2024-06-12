const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  missionId: { type: mongoose.Schema.Types.ObjectId, ref: 'MissionTerminees', required: true },
  contenu: { type: String, required: true }, // Path to the PDF file
  pdfData: { type: Buffer, required: true }, 
  dateCreation:{type:Date,required:true} // Binary data of the PDF
  });
  
const Rapport = mongoose.model('Rapport', rapportSchema);
module.exports = Rapport;
