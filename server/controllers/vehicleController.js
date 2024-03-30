const Vehicle = require('../models/vehicleModel');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const bcrypt = require('bcrypt');

// Get vehicle information

exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

exports.addVehicle = async (req,res) => {
    try {
        const vehicle = req.body;
        const newVehicle = new Vehicle({
            registration: vehicle.registration,
            type: vehicle.type,
            capacity: vehicle.capacity,
            loadCost: vehicle.loadCost,
            unloadCost: vehicle.unloadCost
        });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}