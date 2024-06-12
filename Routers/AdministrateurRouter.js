const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdministrateurController');

router.get('/admin', adminController.getAdmin);
router.put('/admin', adminController.updateAdmin);

module.exports = router;
