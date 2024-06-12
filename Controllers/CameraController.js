const CameraService = require('../Services/CameraService');

class CameraController {
  constructor() {
    this.cameraService = new CameraService();
  }

  async createCamera(req, res) {
    try {
      const newCamera = await this.cameraService.createCamera(req.body);
      res.status(201).json(newCamera);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating camera' });
    }
  }



  async getCameras(req, res) {
    try {
      const cameras = await this.cameraService.getCameras();
      res.json(cameras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving cameras' });
    }
  }

  async getCameraById(req, res) {
    try {
      const camera = await this.cameraService.findById(req.params.id);
      if (!camera) {
        return res.status(404).json({ message: 'Camera not found' });
      }
      res.json(camera);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving camera' });
    }
  }

  async updateCamera(req, res) {
    try {
      const updatedCamera = await this.cameraService.updateCamera(req.params.id, req.body);
      res.json(updatedCamera);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating camera' });
    }
  }

  async deleteCamera(req, res) {
    try {
      const deletedCamera = await this.cameraService.deleteCamera(req.params.id);
      res.json({ message: 'Camera deleted successfully', deletedCamera });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting camera' });
    }
  }
  async getCamerasByMissionId(req, res) {
    try {
      const missionId = req.params.missionId; // Correction pour utiliser req.params.missionId
      console.log('Fetching cameras for mission ID:', missionId);
      const cameras = await this.cameraService.getCamerasByMissionId(missionId);
      res.status(200).json(cameras);
    } catch (error) {
      console.error('Error in getCamerasByMissionId:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
}

module.exports = CameraController;
