const ServiceMontre = require('../Services/MontreService');

class MontreController {
    async createMontre(req, res) {
        try {
            const montreData = req.body;
            const newMontre = await ServiceMontre.createMontre(montreData);
            res.status(201).json(newMontre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMontres(req, res) {
        try {
            const montres = await ServiceMontre.getMontres();
            res.status(200).json(montres);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMontreById(req, res) {
        try {
            const montreId = req.params.id;
            const montre = await ServiceMontre.getMontreById(montreId);
            if (!montre) {
                res.status(404).json({ message: 'Montre not found' });
            } else {
                res.status(200).json(montre);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMontre(req, res) {
        try {
            const montreId = req.params.id;
            const updatedMontreData = req.body;
            const updatedMontre = await ServiceMontre.updateMontre(montreId, updatedMontreData);
            res.status(200).json(updatedMontre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMontre(req, res) {
        try {
            const montreId = req.params.id;
            const deletedMontre = await ServiceMontre.deleteMontre(montreId);
            res.status(200).json(deletedMontre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MontreController();
