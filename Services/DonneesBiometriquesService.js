const Heartbeat = require('../Models/DonneesBiometriques');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

class HeartbeatService {
  constructor() {
    this.port = new SerialPort({
      path: 'COM5',
      baudRate: 9600
    });
    this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));
    this.port.on('open', () => {
      console.log('Port série ouvert');
    });
    this.port.on('error', err => {
      console.error('Erreur : ', err.message);
    });
    this.parser.on('data', this.handleData.bind(this));
  }

  async handleData(data) {
    console.log(`Données reçues: ${data}`);
    const bpmMatch = data.match(/\b\d+\b/);
    if (bpmMatch) {
      const bpm = parseInt(bpmMatch[0], 10);
      if (!isNaN(bpm)) {
        console.log(`BPM valide: ${bpm}`);
        const heartbeat = new Heartbeat({ bpm });
        try {
          await heartbeat.save();
          console.log('Données enregistrées dans MongoDB');
        } catch (err) {
          console.error('Erreur lors de l\'enregistrement des données:', err);
        }
      } else {
        console.log(`BPM invalide: ${data}`);
      }
    } else {
      console.log(`Aucun BPM trouvé dans les données: ${data}`);
    }
  }
}

module.exports = new HeartbeatService();
