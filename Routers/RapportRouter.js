const express = require('express');
const router = express.Router();
const RapportService = require('../Services/RapportService');

// Route pour générer un rapport de mission

const PDFDocument = require('pdfkit');

router.get('/pdf/:missionId', async (req, res) => {
    try {
        const missionId = req.params.missionId;

        // Récupérer les données PDF pour la mission spécifiée
        const pdfData = await RapportService.getPdfDataByMissionId(missionId);

        // Vérifier si des données PDF ont été récupérées
        if (!pdfData) {
            return res.status(404).json({ message: 'Aucun rapport trouvé pour la mission avec l\'ID : ' + missionId });
        }

        // Envoyer les données PDF en tant que réponse avec le type de contenu approprié
        res.contentType('application/pdf');
        res.send(pdfData);
    } catch (error) {
        console.error('Erreur lors de la récupération des données PDF:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des données PDF.' });
    }
});



module.exports = router;
