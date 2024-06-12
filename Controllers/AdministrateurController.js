const adminService = require('../Services/AdministrateurService');

class AdminController {
    async getAdmin(req, res) {
        try {
            const admin = await adminService.getAdmin();
            res.send(admin);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateAdmin(req, res) {
        try {
            const admin = await adminService.updateAdmin(req.body);
            res.send(admin);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports = new AdminController();
