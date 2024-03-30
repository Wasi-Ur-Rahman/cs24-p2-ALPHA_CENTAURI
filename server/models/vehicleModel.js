const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    registration: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    loadCost: {
        type: Number,
        required: true
    },
    unloadCost: {
        type: Number,
        required: true
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;