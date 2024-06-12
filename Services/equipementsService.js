const mongoose = require('mongoose');
const Equipement = require('../Models/EquipementTerrain');


class EquipementService {
  constructor() {}

  async createEquipement(intervenantData) {
    const newEquipement = new Equipement(intervenantData);
    try {
      await newEquipement.save();
      return newEquipement;
    } catch (error) {
      throw error;
    }
  }

  async getEquipements() {
    try {
      const equipements = await Equipement.find();
      return equipements;
    } catch (error) {
      throw error;
    }
  }

   async findById(id) {
    try {
      const equipement = await Equipement.findById(id);
      return equipement;
    } catch (error) {
      throw error;
    }
  }

  async updateEquipement(id, equipementData) {
    try {
      const updatedEquipement = await Equipement.findByIdAndUpdate(id, equipementData, { new: true });
      return updatedEquipement;
    } catch (error) {
      throw error;
    }
  }

  async deleteEquipement(id) {
    try {
      const deletedEquipement = await Equipement.findByIdAndDelete(id);
      return deletedEquipement;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = EquipementService;
