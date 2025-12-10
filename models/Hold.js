const mongoose = require('mongoose');

const holdSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: String,
    seatCodes: [String],
    expiresAt: { type: Date, index: { expires: 0}}, // TTL index
    status: { type:  String, enum: ['active', 'expired', 'confirmed'], default: 'active' },
})

module.exports = mongoose.model('Hold', holdSchema);