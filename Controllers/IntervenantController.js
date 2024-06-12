const IntervenantService = require('../Services/IntervenantService');

class IntervenantIntervenant {
  constructor() {
    this.intervenantService = new IntervenantService();
  }

  async createIntervenant(req, res) {
    try {
      const nouveauIntervenant = await this.intervenantService.createIntervenant(req.body);
      res.status(201).json(nouveauIntervenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du intervenant' });
    }
  }


  async getIntervenants(req, res) {
    try {
      const intervenants = await this.intervenantService.getIntervenants();
      res.json(intervenants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des intervenant' });
    }
  }
  async getIntervenantById(req, res) {
    try {
      const intervenant = await this.intervenantService.findByIdintervenant(req.params.id);
      if (!intervenant) {
        return res.status(404).json({ message: 'Contrôleur non trouvé' });
      }
      res.json(intervenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du contrôleur' });
    }
  }

  async updateIntervenant(req, res) {
    try {
      const updatedIntervenant = await this.intervenantService.updateintervenant(req.params.id, req.body);
      res.json(updatedIntervenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du contrôleur' });
    }
  }

  async deleteIntervenant(req, res) {
    try {
      await this.intervenantService.deleteintervenant(req.params.id);
      res.json({ message: 'Contrôleur supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression du contrôleur' });
    }
  }
  async getIntervenantByName(req, res) {
    try {
      const { name } = req.params;
      const intervenants = await this.intervenantService.searchIntervenant(name); // Correction
      res.json(intervenants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
}

module.exports =IntervenantIntervenant ;
