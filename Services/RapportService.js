const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Writable } = require('stream');
const Rapport = require('../Models/Rapport');
const MissionTermineeService = require('../Services/MissionTermineeService');
const MissionTerminees = require('../Models/MissionTerminee');

class RapportService {
    constructor() {}
    async getPdfDataByMissionId(missionId) {
        try {
            // Recherche du rapport correspondant au missionId spécifié
            const rapport = await Rapport.findOne({ missionId: missionId });

            if (!rapport) {
                throw new Error('Rapport non trouvé pour la mission avec l\'ID : ' + missionId);
            }

            // Récupération du contenu PDF et renvoi
            const pdfData = rapport.pdfData;
            return pdfData;
        } catch (error) {
            throw error;
        }
    }
    async getMissionTById(id) {
        try {
            const mission = await MissionTerminees.findById(id)
                .populate('Responsable', 'name')  // Populate responsable's name
                .populate('controller', 'name')  // Populate controleur's name
                .populate('intervenants','name birth email image')  // Populate intervenants' names
                .populate('equipements.equipementId', 'name');  // Populate equipement names
    
            return mission;
        } catch (error) {
            throw error;
        }
    }
    
    async generateMissionReport(missionId) {
        try {
            console.log("Début de la génération du rapport pour la mission avec l'ID :", missionId);

            // Get the completed mission by its ID
            const mission = await this.getMissionTById(missionId);
            console.log("Mission récupérée :", mission);

            if (!mission) {
                throw new Error('Mission not found');
            }

            // Create the PDF document
            const doc = new PDFDocument();
            // File path to save the report locally
           // const filePath = `../Reports/completedMissions_${mission.name}_${missionId}.pdf`;
            console.log("Chemin du fichier PDF :", filePath);
            doc.pipe(fs.createWriteStream(filePath));

            // Buffer to store PDF data
            const buffers = [];
            const stream = new Writable({
                write(chunk, encoding, next) {
                    buffers.push(chunk);
                    next();
                }
            });

            // Pipe the PDF into the writable stream
            doc.pipe(stream);

            // Add the header
            const currentDate = new Date();
            doc
                .image("../Pictures/army.png", 50, 45, { width: 50 })
                .fillColor("#444444")
                .fontSize(20)
                .text("Completed Missions Report", 110, 57)
                .fontSize(10)
                .text(`Date: ${currentDate.toLocaleDateString()}`, 200, 65, { align: "right" })
                .moveDown();

            // Add mission details
            doc
                .fontSize(14)
                .text(`Mission ID: ${mission._id}`, 50, doc.y + 20) // Adjust coordinates for top margin and left alignment
                .text(`Mission Name: ${mission.name}`)
                .text(`Responsible: ${mission.Responsable.name}`)
                .text(`Controller: ${mission.controller.name}`)
                .text(`Mission Objective: ${mission.objectif}`)
                .text(`Start Date: ${formatDate(mission.datedebut)}`)
                .text(`Start Time: ${mission.heuredebut}`)
                .text(`End Date: ${formatDate(mission.dateFin)}`)
                .text(`End Time: ${mission.heureFin}`)
                .text(`Mission Result: ${mission.resultat}`);
            
            // Debugging instructions
            console.log("Mission details added to the PDF document");

            // Finalize the PDF and end the stream
            doc.end();

            stream.on('finish', async () => {
                const pdfData = Buffer.concat(buffers);

                // Save PDF data and metadata to the database
                const newRapport = new Rapport({
                    userId: mission.user, // User linked to the mission
                    missionId: missionId,
                    filePath: `completedMissions_${mission.name}_${missionId}.pdf`,
                    pdfData: pdfData
                });

                await newRapport.save();

                console.log(`The report has been generated and saved in the database: completedMissions_${mission.name}_${missionId}.pdf`);
            });

        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
    }

    async getRapportByMissionId(missionId) {
        try {
            // Find the report with the specified mission ID
            const rapport = await Rapport.findOne({ missionId: missionId }).populate('userId missionId');
            return rapport;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RapportService();
