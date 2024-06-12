/*
const MissionTerminees = require('../Models/MissionTerminee');
const userService = require('../Services/AgentMissionService');
const Rapport = require('../Models/Rapport');
const PDFDocument = require("pdfkit-table");
const PDFTable = require('pdfkit-table');
const fs = require('fs');
const { Writable } = require('stream');

class MissionTermineesService {
    constructor() {}
      
  async  getMissionsTerminees() {
    try {
      const missionsterminees = await MissionTerminees.find();
      return missionsterminees;
    } catch (error) {
      throw error; 
    }
  }
  async getMissionTById(id) {
    try {
        const mission = await MissionTerminees.findById(id)
            .populate('Responsable', 'name')  // Populate responsable's name
            .populate('controller', 'name')  // Populate controleur's name
            .populate('intervenants','name birth email image  datebirth identificationMilitaire adressePersonnelle numeroTelephone')  // Populate intervenants' names
            .populate('equipements.equipementId', 'name');  // Populate equipement names

        return mission;
    } catch (error) {
        throw error;
    }
}
async generateMissionReport(missionId) {
  try {
      function formatDate(dateString) {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}/${month}/${day}`;
      }

      const mission = await this.getMissionTById(missionId);
      if (!mission) {
          throw new Error('Mission not found');
      }

      const doc = new PDFDocument();
      const buffers = [];

      const writableStream = new Writable({
          write(chunk, encoding, next) {
              buffers.push(chunk);
              next();
          }
      });

      doc.pipe(writableStream);
      doc.image('./Pictures/army.png', 50, 45, { width: 50 });
      doc.fillColor('#444444');
      doc.fontSize(20).text('Completed Missions Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.moveDown();

      doc.fontSize(14).text(`Mission ID: ${mission._id}`);
      doc.moveDown();
      doc.text(`Mission Name: ${mission.name}`);
      doc.moveDown();
      doc.text(`Responsible: ${mission.Responsable.name}`);
      doc.moveDown();
      doc.text(`Controller: ${mission.controller.name}`);
      doc.moveDown();
      doc.text(`Mission Objective: ${mission.objectif}`);
      doc.moveDown();
      doc.text(`Start Date: ${formatDate(mission.datedebut)}`);
      doc.moveDown();
      doc.text(`Start Time: ${mission.heuredebut}`);
      doc.moveDown();
      doc.text(`End Date: ${formatDate(mission.dateFin)}`);
      doc.moveDown();
      doc.text(`End Time: ${mission.heureFin}`);
      doc.moveDown();
      doc.text(`Mission Result: ${mission.resultat}`);
      doc.moveDown();
      if (mission.rate) {
          doc.text(`Rate: ${mission.rate}`);
          doc.moveDown();
      }
      if (mission.cause) {
          doc.text(`Cause: ${mission.cause}`);
          doc.moveDown();
      }

      doc.fontSize(12).text('Participants:', { underline: true });
      doc.moveDown();
      doc.table({
          headers: ['Name', 'Email', 'Date of Birth', 'Military ID', 'Phone'],
          rows: mission.intervenants.map(intervenant => [
            intervenant.name,
            intervenant.email,
            formatDate(intervenant.datebirth),
            intervenant.identificationMilitaire,
            intervenant.numeroTelephone
        ]),
          layout: 'lightHorizontalLines'
      });
      doc.moveDown();

      doc.fontSize(12).text('Used Equipment:', { underline: true });
      doc.moveDown();
      doc.table({
          headers: ['Equipment', 'Quantity Used'],
          rows: mission.equipements.map(equipement => [
            equipement.equipementId.name,
            equipement.quantiteUtilisee
        ]),
          layout: 'lightHorizontalLines'
      });
      const signatureY = doc.page.height - 40;
      doc.text('Signature', doc.page.width - 60, signatureY, { align: 'right' });
      doc.moveDown();

      doc.end();

      writableStream.on('finish', async () => {
          const pdfData = Buffer.concat(buffers);

          const newReport = new Rapport({
              missionId: missionId,
              contenu: `completedMissions_${mission.name}_${missionId}.pdf`,
              pdfData: pdfData,
              dateCreation: new Date().toLocaleDateString()
          });

          await newReport.save();
          console.log(`The report has been generated and saved in the database: completedMissions_${mission.name}_${missionId}.pdf`);
      });

      writableStream.on('error', (error) => {
          console.error('Error writing PDF file:', error);
      });
  } catch (error) {
      console.error('Error generating PDF report:', error);
  }
}

  async deleteMission(missionId) {
    try {
        // Supprimer la mission de la base de données
        const deletedMission = await MissionTerminees.findOneAndDelete(missionId);
        console.log('Mission deleted successfully');
        return deletedMission;
    } catch (error) {
        throw error;
    }
}
async getMissionsTerminnesByUser(userId) {
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        // Recherche de missions affectées à cet utilisateur en tant que contrôleur ou superviseur
        const missions = await MissionTerminees.find({ Responsable: user._id  });

        return missions;
    } catch (error) {
        console.error('Erreur lors de la récupération des missions par utilisateur :', error);
        throw error;
    }
}
async updateMission(missionId, updatedMission) {
  try {
    // Mettre à jour la mission dans la base de données
    const updatedMissionData = await MissionTerminees.findByIdAndUpdate(missionId, updatedMission, { new: true });
    console.log('Mission updated successfully');
    return updatedMissionData;
  } catch (error) {
    throw error;
  }
}
async  statistiquesUtilisationEquipements(idMission) {
  try {
      // Récupérer la mission terminée par son ID
      const mission = await MissionTerminees.findById(idMission).populate('equipements.equipementId');
      
      if (!mission) {
          throw new Error('La mission spécifiée est introuvable.');
      }

      // Initialiser un objet pour stocker les statistiques d'utilisation des équipements
      const statsEquipements = {};

      // Parcourir chaque équipement utilisé dans la mission
      mission.equipements.forEach(({ equipementId, quantiteUtilisee }) => {
          const nomEquipement = equipementId.name;

          // Vérifier si l'équipement est déjà répertorié dans les statistiques
          if (statsEquipements[nomEquipement]) {
              // Si oui, ajouter la quantité utilisée à l'existant
              statsEquipements[nomEquipement] += quantiteUtilisee;
          } else {
              // Sinon, initialiser la quantité utilisée pour cet équipement
              statsEquipements[nomEquipement] = quantiteUtilisee;
          }
      });

      return statsEquipements;
  } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors du calcul des statistiques d\'utilisation des équipements:', error.message);
      throw error;
  }
}
async getIntervenantsFromMission(missionId) {
  try {
    // Récupérer la mission terminée par son ID
    const mission = await MissionTerminees.findById(missionId).populate('intervenants');

    if (!mission) {
      throw new Error('La mission spécifiée est introuvable.');
    }

    // Retourner les intervenants de la mission
    return mission.intervenants;
  } catch (error) {
    console.error('Erreur lors de la récupération des intervenants de la mission :', error);
    throw error;
  }
}

async deleteMissionsByUser(userId) {
    try {
        // Delete all the completed missions of the user
        const deletedMissions = await MissionTerminees.deleteMany({ 
            $and: [
                { Responsable: userId }, 
                { controller: userId }
            ]
        });
        console.log(`${deletedMissions.deletedCount} completed missions deleted for the user ${userId}`);
        return deletedMissions;
    } catch (error) {
        console.error('Error deleting completed missions of the user:', error);
        throw error;
    }
  }  

}
module.exports=MissionTermineesService;
      */
const MissionTerminees = require('../Models/MissionTerminee');
const userService = require('../Services/AgentMissionService');
const Rapport = require('../Models/Rapport');
const PDFDocument = require("pdfkit-table");
const PDFTable = require('pdfkit-table');
const fs = require('fs');
const { Writable } = require('stream');

class MissionTermineesService {
    constructor() {}
      
  async  getMissionsTerminees() {
    try {
      const missionsterminees = await MissionTerminees.find();
      return missionsterminees;
    } catch (error) {
      throw error; 
    }
  }
  async getMissionTById(id) {
    try {
        const mission = await MissionTerminees.findById(id)
            .populate('Responsable', 'name')  // Populate responsable's name
            .populate('controller', 'name')  // Populate controleur's name
            .populate('intervenants','name  email image  datebirth idMilitaire adresse telephone')  // Populate intervenants' names
            .populate('equipements.equipementId', 'name disponible');  // Populate equipement names

        return mission;
    } catch (error) {
        throw error;
    }
}
async generateMissionReport(missionId) {
  try {
      function formatDate(dateString) {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}/${month}/${day}`;
      }

      const mission = await this.getMissionTById(missionId);
      if (!mission) {
          throw new Error('Mission not found');
      }

      const doc = new PDFDocument();
      const buffers = [];

      const writableStream = new Writable({
          write(chunk, encoding, next) {
              buffers.push(chunk);
              next();
          }
      });

      doc.pipe(writableStream);
      doc.image('./Pictures/army.png', 50, 45, { width: 50 });
      doc.fillColor('#444444');
      doc.fontSize(20).text('Completed Missions Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.moveDown();

      doc.fontSize(14).text(`Mission ID: ${mission._id}`);
      doc.moveDown();
      doc.text(`Mission Name: ${mission.name}`);
      doc.moveDown();
      doc.text(`Responsible: ${mission.Responsable.name}`);
      doc.moveDown();
      doc.text(`Controller: ${mission.controller.name}`);
      doc.moveDown();
      doc.text(`Mission Objective: ${mission.objectif}`);
      doc.moveDown();
      doc.text(`Start Date: ${formatDate(mission.datedebut)}`);
      doc.moveDown();
      doc.text(`Start Time: ${mission.heuredebut}`);
      doc.moveDown();
      doc.text(`End Date: ${formatDate(mission.dateFin)}`);
      doc.moveDown();
      doc.text(`End Time: ${mission.heureFin}`);
      doc.moveDown();
      doc.text(`Mission Result: ${mission.resultat}`);
      doc.moveDown();
      if (mission.rate) {
          doc.text(`Rate: ${mission.rate}`);
          doc.moveDown();
      }
      if (mission.cause) {
          doc.text(`Cause: ${mission.cause}`);
          doc.moveDown();
      }

      doc.fontSize(12).text('Participants:', { underline: true });
      doc.moveDown();
      doc.table({
          headers: ['Name', 'Email', 'Date of Birth', 'Military ID', 'Phone'],
          rows: mission.intervenants.map(intervenant => [
            intervenant.name,
            intervenant.email,
            formatDate(intervenant.datebirth),
            intervenant.idMilitaire,
            intervenant.telephone
        ]),
          layout: 'lightHorizontalLines'
      });
      doc.moveDown();
      doc.addPage(); // Ajoutez une nouvelle page si nécessaire
      doc.fontSize(12).text('Used Equipment:', { underline: true });
      doc.moveDown();
      doc.table({
          headers: ['Equipment', 'Quantity Used'],
          rows: mission.equipements.map(equipement => [
            equipement.equipementId.name,
            equipement.quantiteUtilisee
        ]),
          layout: 'lightHorizontalLines'
      });
      doc.moveDown();
      doc.text('Signature:', doc.page.width - 100, doc.y, { align: 'right' });
      doc.moveDown();

      doc.end();

      writableStream.on('finish', async () => {
          const pdfData = Buffer.concat(buffers);

          const newReport = new Rapport({
              missionId: missionId,
              contenu: `completedMissions_${mission.name}_${missionId}.pdf`,
              pdfData: pdfData,
              dateCreation: new Date().toLocaleDateString()
          });

          await newReport.save();
          console.log(`The report has been generated and saved in the database: completedMissions_${mission.name}_${missionId}.pdf`);
      });

      writableStream.on('error', (error) => {
          console.error('Error writing PDF file:', error);
      });
  } catch (error) {
      console.error('Error generating PDF report:', error);
  }
}

  async deleteMission(missionId) {
    try {
        // Supprimer la mission de la base de données
        const deletedMission = await MissionTerminees.findOneAndDelete(missionId);
        console.log('Mission deleted successfully');
        return deletedMission;
    } catch (error) {
        throw error;
    }
}
async getMissionsTerminnesByUser(userId) {
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        // Recherche de missions affectées à cet utilisateur en tant que contrôleur ou superviseur
        const missions = await MissionTerminees.find({ Responsable: user._id  });

        return missions;
    } catch (error) {
        console.error('Erreur lors de la récupération des missions par utilisateur :', error);
        throw error;
    }
}
async updateMission(missionId, updatedMission) {
  try {
    // Mettre à jour la mission dans la base de données
    const updatedMissionData = await MissionTerminees.findByIdAndUpdate(missionId, updatedMission, { new: true });
    console.log('Mission updated successfully');
    return updatedMissionData;
  } catch (error) {
    throw error;
  }
}
async  statistiquesUtilisationEquipements(idMission) {
  try {
      // Récupérer la mission terminée par son ID
      const mission = await MissionTerminees.findById(idMission).populate('equipements.equipementId');
      
      if (!mission) {
          throw new Error('La mission spécifiée est introuvable.');
      }

      // Initialiser un objet pour stocker les statistiques d'utilisation des équipements
      const statsEquipements = {};

      // Parcourir chaque équipement utilisé dans la mission
      mission.equipements.forEach(({ equipementId, quantiteUtilisee }) => {
          const nomEquipement = equipementId.name;

          // Vérifier si l'équipement est déjà répertorié dans les statistiques
          if (statsEquipements[nomEquipement]) {
              // Si oui, ajouter la quantité utilisée à l'existant
              statsEquipements[nomEquipement] += quantiteUtilisee;
          } else {
              // Sinon, initialiser la quantité utilisée pour cet équipement
              statsEquipements[nomEquipement] = quantiteUtilisee;
          }
      });

      return statsEquipements;
  } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors du calcul des statistiques d\'utilisation des équipements:', error.message);
      throw error;
  }
}
async getIntervenantsFromMission(missionId) {
  try {
    // Récupérer la mission terminée par son ID
    const mission = await MissionTerminees.findById(missionId).populate('intervenants');

    if (!mission) {
      throw new Error('La mission spécifiée est introuvable.');
    }

    // Retourner les intervenants de la mission
    return mission.intervenants;
  } catch (error) {
    console.error('Erreur lors de la récupération des intervenants de la mission :', error);
    throw error;
  }
}

async deleteMissionsByUser(userId) {
    try {
        // Delete all the completed missions of the user
        const deletedMissions = await MissionTerminees.deleteMany({ 
            $and: [
                { Responsable: userId }, 
                { controller: userId }
            ]
        });
        console.log(`${deletedMissions.deletedCount} completed missions deleted for the user ${userId}`);
        return deletedMissions;
    } catch (error) {
        console.error('Error deleting completed missions of the user:', error);
        throw error;
    }
  }  

}
module.exports=MissionTermineesService;