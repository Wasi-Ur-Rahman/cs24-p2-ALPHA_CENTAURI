const Sts = require('../models/stsModel');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const bcrypt = require('bcrypt');

// Get sts information

exports.getSts = async (req, res, next) => {
  try {
    const sts = await Sts.find();
    res.status(200).json(sts);
  } catch (error) {
    next(error);
  }
};

exports.addSts = async (req,res) => {
    try {
        const sts = req.body;
        const newSts = new Sts({
            ward: sts.ward,
            capacity: sts.capacity,
            coordinate: sts.coordinate
        });
        await newSts.save();
        res.status(201).json(newSts);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}
exports.deleteSts = async (req, res) => {
  try {
      const stsId = req.params.stsId;
      const deletedSts = await Sts.findByIdAndDelete(stsId);
      if (!deletedSts) {
          throw createError(404, 'STS not found');
      }
      res.status(200).json({ message: 'STS deleted successfully' });
  } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
  }
};

exports.assignTruck = async (req, res) => {
  const { stsId } = req.params;
  const { truckId } = req.body;

  try {
      // Find the STS by ID
      const sts = await Sts.findById(stsId);
      
      if (!sts) {
          return res.status(404).json({ message: 'STS not found' });
      }

      // Update the STS with the assigned truck ID
      sts.truck = truckId;
      await sts.save();

      res.status(200).json({ message: 'Truck assigned to STS successfully' });
  } catch (error) {
      console.error('Error assigning truck to STS:', error);
      res.status(500).json({ message: 'Failed to assign truck to STS' });
  }
};