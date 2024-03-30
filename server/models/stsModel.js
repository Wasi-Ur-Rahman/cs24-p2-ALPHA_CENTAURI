const mongoose = require('mongoose');

const stsSchema = new mongoose.Schema({
    ward: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    coordinate: {
        type: String,
        required: true
    }
});

const Sts = mongoose.model('Sts', stsSchema);

module.exports = Sts;