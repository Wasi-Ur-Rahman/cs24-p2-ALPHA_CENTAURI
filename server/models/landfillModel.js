const mongoose = require('mongoose');

const landfillSchema = new mongoose.Schema({
    capacity: {
        type: String,
        required: true
    },
    operationalTimespan: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    }
});

const Landfill = mongoose.model('Landfill', landfillSchema);

module.exports = Landfill;