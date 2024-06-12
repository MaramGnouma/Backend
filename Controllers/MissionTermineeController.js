const MissionTerminnesService = require('../Services/MissionTermineeService');
class MissiontermineesController {
  constructor() {
    this.missionTService = new MissionTerminnesService();
  }

  
  async getMissionsTerminnes(req, res) {
    try {
      const missions = await this.missionTService.getMissionsTerminees();
      res.json(missions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des missions' });
    }
  }

  async getMissionById(req, res) {
    try {
      const mission = await this.missionTService.getMissionTById(req.params.id);
      if (!mission) {
        return res.status(404).json({ message: 'Mission non trouvée' });
      }
      res.json(mission);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la mission' });
    }
  }


async deleteMission(req, res) {
  const missionId = req.params.id;
    try {
        const deletedMission = await this.missionTService.deleteMission(missionId);
        res.json({ message: 'Mission supprimée avec succès', deletedMission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async getMissionsTByUser(req, res) {
    const userId = req.params.userId;

    try {
        const missions = await this.missionTService.getMissionsTerminnesByUser(userId);
        res.json(missions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async getIntervenantsFromMission(req, res) {
  const missionId = req.params.missionId;

  try {
      const missions = await this.missionTService.getIntervenantsFromMission(missionId);
      res.json(missions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
async updateMissionT(req, res) {
  try {
    const missions = await this.missionTService.updateMission(req.params.id, req.body);
    res.json(missions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du missions' });
  }
}
async statistiquesUtilisationEquipements(req, res) {
  const missionid = req.params.missionid;

  try {
      const missions = await this.missionTService.statistiquesUtilisationEquipements(missionid);
      res.json(missions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
 async generateMissionReport(req, res) {
  const missionId = req.params.missionId;

  try {
      await this.missionTService.generateMissionReport(missionId);
      res.send('Rapport généré avec succès.');
  } catch (error) {
      res.status(500).send('Une erreur est survenue lors de la génération du rapport PDF.');
  }
}
}

module.exports = MissiontermineesController;
