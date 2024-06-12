const EquipementService = require('../Services/equipementsService');

class EquipementController {
  constructor() {
    this.equipementService = new EquipementService();
  }

  async createEquipement(req, res) {
    try {
      const newEquipement = await this.equipementService.createEquipement(req.body);
      res.status(201).json(newEquipement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating equipement' });
    }
  }

  async getEquipements(req, res) {
    try {
      const equipements = await this.equipementService.getEquipements();
      res.json(equipements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving equipements' });
    }
  }

  async getEquipementById(req, res) {
    try {
      const equipement = await this.equipementService.findById(req.params.id);
      if (!equipement) {
        return res.status(404).json({ message: 'Equipement not found' });
      }
      res.json(equipement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving equipement' });
    }
  }
  
  async updateEquipement(req, res) {
    try {
      const updatedEquipement = await this.equipementService.updateEquipement(req.params.id, req.body);
      res.json(updatedEquipement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating equipement' });
    }
  }

  async deleteEquipement(req, res) {
    try {
      const deletedEquipement = await this.equipementService.deleteEquipement(req.params.id);
      res.json({ message: 'Equipement deleted successfully', deletedEquipement });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting equipement' });
    }
  }
}

module.exports = EquipementController;
