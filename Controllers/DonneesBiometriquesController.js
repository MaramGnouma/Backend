const Heartbeat = require('../Models/DonneesBiometriques');


class HeartbeatController {
  async getLastHeartRate(req, res) {
    try {
      const lastHeartRate = await Heartbeat.findOne().sort({ timestamp: -1 });
      res.json(lastHeartRate);
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière fréquence cardiaque:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  async getHeartRateData(req, res) {
    try {
      const data = await Heartbeat.find().sort({ timestamp: -1 }).limit(20);
      const bpmData = data.map(entry => entry.bpm);
      res.json(bpmData);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new HeartbeatController();
