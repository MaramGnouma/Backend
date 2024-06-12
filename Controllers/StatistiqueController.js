const StatistiquesService = require('../Services/StatistiquesService');

const statistiquesService = new StatistiquesService();

class StatistiquesController {
  constructor() {}

  async getMissionStatsByType(req, res) {
    try {
      const stats = await statistiquesService.getMissionStatsByType();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async getMissionStatsByResultAndYear(req, res) {
    try {
      const stats = await statistiquesService.getMissionStatsByResultAndYear();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async getMissionStatsByResponsableAndResult(req, res) {
    try {
      const stats = await statistiquesService.getMissionStatsByResponsableAndResult();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async getAverageMissionDuration(req, res) {
    try {
      const stats = await statistiquesService.getAverageMissionDuration();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async getResultsDistributionByPeriod(req, res) {
    try {
      const stats = await statistiquesService.getResultsDistributionByPeriod();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async getAverageSuccessRateByType(req, res) {
    try {
      const stats = await statistiquesService.getAverageSuccessRateByType();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new StatistiquesController();
