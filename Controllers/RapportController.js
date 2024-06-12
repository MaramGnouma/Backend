const RapportService = require('../Services/RapportService');

class RapportController {
    static async generateMissionReport(req, res) {
        const missionId = req.params.missionId;

        try {
            await RapportService.generateMissionReport(missionId);
            res.send('Rapport généré avec succès.');
        } catch (error) {
            res.status(500).send('Une erreur est survenue lors de la génération du rapport PDF.');
        }
    }

    static async getRapportByMissionId(req, res) {
        try {
            const missionId = req.params.missionId;
            const rapport = await RapportService.getRapportByMissionId(missionId);
            if (!rapport) {
                return res.status(404).json({ message: "Rapport introuvable pour l'ID de la mission spécifié." });
            }
            res.json(rapport);
        } catch (error) {
            console.error("Erreur lors de la récupération du rapport par ID de mission :", error);
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération du rapport." });
        }
    }
}

module.exports = new RapportController();
