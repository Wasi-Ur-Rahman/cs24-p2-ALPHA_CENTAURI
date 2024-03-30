const Landfill = require('../models/landfillModel');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const bcrypt = require('bcrypt');

// Get landfill information

exports.getLandfill = async (req, res, next) => {
  try {
    const landfill = await Landfill.find();
    res.status(200).json(landfill);
  } catch (error) {
    next(error);
  }
};

exports.addLandfill = async (req,res) => {
    try {
        const landfill = req.body;
        const newLandfill = new Landfill({
            capacity: landfill.capacity,
            operationalTimespan: landfill.operationalTimespan,
            coordinates: landfill.coordinates
        });
        await newLandfill.save();
        res.status(201).json(newLandfill);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}
exports.deleteLandfill = async (req, res, next) => {
  try {
      const landfillId = req.params.landfillId;

      // Check if the landfill exists
      const landfill = await Landfill.findById(landfillId);
      if (!landfill) {
          return next(createError(404, 'Landfill not found'));
      }

      // Delete the landfill
      await Landfill.findByIdAndDelete(landfillId);
      res.status(200).json({ message: 'Landfill deleted successfully' });
  } catch (error) {
      next(error);
  }
};