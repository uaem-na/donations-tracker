const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    ppeProfiles: { type: [], required: true },
    status: { type: String, required: true },
    reportIds: { type: [], required: false }
}, { timestamps: true });

module.exports.Requests = mongoose.model('Requests', requestSchema);
