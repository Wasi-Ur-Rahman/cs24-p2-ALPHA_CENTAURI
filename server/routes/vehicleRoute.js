const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const router = express.Router();

router.get('/vehicles', vehicleController.getVehicles);
router.post("/vehicles", vehicleController.addVehicle);

module.exports = router;