const express = require('express');
const router = express.Router();
const ControllerMontre = require('../Controllers/MontreController');

// Route pour créer une montre
/**
 * @swagger
 * /montres:
 *   post:
 *     summary: Crée une nouvelle montre
 *     description: Crée une nouvelle montre avec les données fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Montre'
 *     responses:
 *       201:
 *         description: Succès, retourne la nouvelle montre créée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/montres', ControllerMontre.createMontre);


/**
 * @swagger
 * /montres:
 *   get:
 *     summary: Obtient toutes les montres
 *     description: Récupère la liste de toutes les montres disponibles.
 *     responses:
 *       200:
 *         description: Succès, retourne la liste des montres.
 *       500:
 *         description: Erreur interne du serveur.
 */
// Route pour obtenir toutes les montres
router.get('/montres', ControllerMontre.getMontres);

// Route pour obtenir une montre par ID

/**
 * @swagger
 * /montres/{id}:
 *   get:
 *     summary: Obtient une montre par ID
 *     description: Récupère une montre spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montre à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès, retourne la montre demandée.
 *       404:
 *         description: Montre non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/montres/:id', ControllerMontre.getMontreById);

// Route pour mettre à jour une montre


/**
 * @swagger
 * /montres/{id}:
 *   put:
 *     summary: Met à jour une montre existante
 *     description: Met à jour les données d'une montre spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montre à mettre à jour
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Montre'
 *     responses:
 *       200:
 *         description: Succès, retourne la montre mise à jour.
 *       404:
 *         description: Montre non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/montres/:id', ControllerMontre.updateMontre);

// Route pour supprimer une montre

/**
 * @swagger
 * /montres/{id}:
 *   delete:
 *     summary: Supprime une montre existante
 *     description: Supprime une montre spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montre à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès, retourne la montre supprimée.
 *       404:
 *         description: Montre non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/montres/:id', ControllerMontre.deleteMontre);

module.exports = router;
