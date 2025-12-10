const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: String,
    seatCodes: [String],
    total: Number,
    idempotencyKey: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);