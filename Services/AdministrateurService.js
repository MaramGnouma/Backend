const Admin = require('../Models/Administrateur');

class AdminService {
    async getAdmin() {
        try {
            const admin = await Admin.findOne();
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async updateAdmin(adminData) {
        try {
            // Vérifier si l'email est fourni et s'il est valide
            if (adminData.email && !isValidEmail(adminData.email)) {
                throw new Error('Invalid email address');
            }

            const admin = await Admin.findOneAndUpdate({}, adminData, { new: true, upsert: true });
            return admin;
        } catch (error) {
            throw error;
        }
    }
}

function isValidEmail(email) {
    // Expression régulière pour valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
}

module.exports = new AdminService();
