const MissionService = require('../Services/MissionEnCoursService');
const MissionTerminees = require('../Models/MissionTerminee');
class MissionController {
  constructor() {
    this.missionService = new MissionService();
    // Assurez-vous que vous avez correctement initialisé this.missionService avec une instance de MissionService
  }

  async createMission(req, res) {
    try {
      const nouvelleMission = await this.missionService.createMission(req.body);
      res.status(201).json(nouvelleMission);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création de la mission' });
    }
  }

  async getMissions(req, res) {
    try {
      const missions = await this.missionService.getMissions();
      res.json(missions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des missions' });
    }
  }
  
  async getMissionsTerminnes(req, res) {
    try {
      const missions = await this.missionService.getMissionsTerminees();
      res.json(missions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des missions' });
    }
  }

  async getMissionById(req, res) {
    try {
      const mission = await this.missionService.getMissionById(req.params.id);
      if (!mission) {
        return res.status(404).json({ message: 'Mission non trouvée' });
      }
      res.json(mission);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la mission' });
    }
  }

  async getCountMissionTypes(req, res) {
    try {
      const missionTypeCounts = await this.missionService.countMissionTypes();
      res.status(200).json(missionTypeCounts);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de chaque type de mission :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du nombre de chaque type de mission.' });
    }
  }


// Méthode pour mettre à jour les résultats de la mission
async  updateMissionResult(req, res) {
  const { missionId } = req.params;
  const { result, cause ,rate } = req.body;

  try {
    // Appelez la méthode du service pour mettre à jour les résultats de la mission
    const updatedMissionTerminee = await this.missionService.TerminerMission(missionId, result, cause,rate);
    res.status(200).json(updatedMissionTerminee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async deleteMission(req, res) {
  try {
    const missionId = req.params.id; // Utilisez req.params.id pour récupérer l'ID de la mission
    await this.missionService.deleteMission(missionId); // Appelez la méthode deleteMission du service
    res.status(200).send("Mission supprimée avec succès"); // Envoyez une réponse indiquant que la mission a été supprimée
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la mission' });
  }
}

async getMissionsByUser(req, res) {
  const userId = req.params.userId;

  try {
      const missions = await this.missionService.getMissionsByUser(userId);
      res.json(missions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
async updateMission(req, res) {
  try {
    const missionId = req.params.missionId;  // Correction ici
    const updatedData = req.body;
    const updatedMission = await this.missionService.updateMission(missionId, updatedData);
    res.status(200).json(updatedMission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async getAllEquipmentsWithQuantityAndStatus(req, res) {
  try {
    const missionId = req.params.missionId;  // Correction ici
    const Equipement = await this.missionService.getUsedEquipmentsAndQuantities(missionId);
    res.status(200).json(Equipement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
 async getIntervenantsByMissionId(req, res) {
  const { missionId } = req.params;

  try {
      const intervenantNames = await this.missionService.getIntervenantsByMissionId(missionId);
      return res.status(200).json(intervenantNames);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}

}

module.exports = MissionController;
