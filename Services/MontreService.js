const Montre = require('../Models/Montre');

class MontreService {
    async createMontre(montreData) {
        try {
            const newMontre = new Montre(montreData);
            const savedMontre = await newMontre.save();
            return savedMontre;
        } catch (error) {
            throw error;
        }
    }

    async getMontres() {
        try {
            const montres = await Montre.find();
            return montres;
        } catch (error) {
            throw error;
        }
    }

    async getMontreById(id) {
        try {
            const montre = await Montre.findById(id);
            return montre;
        } catch (error) {
            throw error;
        }
    }

    async updateMontre(id, updatedMontreData) {
        try {
            const updatedMontre = await Montre.findByIdAndUpdate(id, updatedMontreData, { new: true });
            return updatedMontre;
        } catch (error) {
            throw error;
        }
    }

    async deleteMontre(id) {
        try {
            const deletedMontre = await Montre.findByIdAndDelete(id);
            return deletedMontre;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MontreService();
