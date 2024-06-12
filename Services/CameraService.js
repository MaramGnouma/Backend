const mongoose = require('mongoose');
const Camera = require('../Models/Camera');
const Mission = require('../Models/MissionEnCours');

class CameraService {
  constructor() {}

  async createCamera(cameraData) {
    const newCamera = new Camera(cameraData);
    try {
      await newCamera.save();
      return newCamera;
    } catch (error) {
      throw error;
    }
  }

  async getCameras() {
    try {
      const cameras = await Camera.find();
      return cameras;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const camera = await Camera.findById(id);
      return camera;
    } catch (error) {
      throw error;
    }
  }

  async updateCamera(id, cameraData) {
    try {
      const updatedCamera = await Camera.findByIdAndUpdate(id, cameraData, { new: true });
      return updatedCamera;
    } catch (error) {
      throw error;
    }
  }

  async deleteCamera(id) {
    try {
      const deletedCamera = await Camera.findByIdAndDelete(id);
      return deletedCamera;
    } catch (error) {
      throw error;
    }
  }
  async getCamerasByMissionId(missionId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(missionId)) {
        throw new Error('Invalid mission ID');
      }
  
      const mission = await Mission.findById(missionId);
      if (!mission) {
        throw new Error('Mission not found');
      }
      const camera= await this.findById(mission.camera);
      return camera; // Assurez-vous que le champ est 'cameras'
    } catch (error) {
      console.error('Error in getCamerasByMissionId:', error);
      throw error;
    }
  }
}

module.exports = CameraService;
