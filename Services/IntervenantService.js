const mongoose = require('mongoose');
const Intervenant = require('../Models/Intervenant');


class IntervenantService {
  constructor() {}

  async createIntervenant(intervenantData) {
    const newCIntervenant = new Intervenant(intervenantData);
    try {
      await newCIntervenant.save();
      return newCIntervenant;
    } catch (error) {
      throw error;
    }
  }

  async getIntervenants() {
    try {
      const Intervenants = await Intervenant.find();
      return Intervenants;
    } catch (error) {
      throw error;
    }
  } 

   async findByIdintervenant(id) {
    try {
      const intervenant = await Intervenant.findById(id);
      return intervenant;
    } catch (error) {
      throw error;
    }
  }

  async updateintervenant(id, intervenantData) {
    try {
      const updatedintervenant = await Intervenant.findByIdAndUpdate(
        id,
        intervenantData,
        { new: true } // Return the updated document
      );
      return updatedintervenant;
    } catch (error) {
      throw error;
    }
  }

  async deleteintervenant(id) {
    try {
      await Intervenant.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  async searchIntervenant(query) {
    try {
      const intervenants = await Intervenant.find({ name: { $regex: new RegExp(query, 'i') } });
      return intervenants;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'intervenant :', error);
      throw new Error('Erreur interne du serveur');
    }
  }
  
  
  
  
}

module.exports = IntervenantService;
