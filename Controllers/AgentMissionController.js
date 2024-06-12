const userService = require('../Services/AgentMissionService');

class AgentMissionController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.send(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async acceptUser(req, res) {
        try {
            const user = await userService.acceptUser(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.send(user);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
    async getUsersByRole(req, res) {
        try {
            const users = await userService.getUsersByRole(req.params.role);
            res.send(users);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
    
    async getUserByName(req, res) {
        try {
            const { name } = req.params; // Changer de q à name pour correspondre au paramètre dans l'URL
            const users = await userService.searchUser(name); // Appeler searchUser avec le nom correct
            res.json(users);
          } catch (error) {
            res.status(500).send(error.message);
          }
    }
    async getUserNotifications(req, res) {
        try {
            const userId = req.params.id;
            const notifications = await userService.getUserNotifications(userId);
            res.json(notifications);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getMissionsByUser(req, res) {
        try {
            const missions = await userService.getMissionsByUser(req.params.id);
            res.send(missions);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
   
}

module.exports = new AgentMissionController();
