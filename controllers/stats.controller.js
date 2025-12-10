"use strict";

const Event = require('../models/Event');
const Hold = require('../models/Hold');
const Booking = require('../models/Booking');


exports.getStats = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);
        const bookings = await Booking.find({ eventId });
        const holds = await Hold.find({ eventId, status: 'active', expiresAt: { $gt: new Date() } });

        const bookedSeats = bookings.flatMap(b => b.seatCodes);
        const heldSeats = holds.flatMap(h => h.seatCodes);

        return res.status(200).json({
            totalSeats: event.seats.length,
            booked: bookedSeats.length,
            held: heldSeats.length,
            available: event.seats.length - (bookedSeats.length + heldSeats.length),
            revenue: bookings.reduce((sum, b) => sum + b.total, 0)
        });
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}