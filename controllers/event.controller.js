"use strict";

const Event = require('../models/Event');
const Hold = require('../models/Hold');
const Booking = require('../models/Booking');


exports.getAvailableSeats = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        const activeHolds = await Hold.find({
            eventId: event._id,
            status: 'active',
            expiresAt: { $gt: new Date() }
        });

        const bookings = await Booking.find({ eventId: event._id });

        const blockedSeats = [
            ...activeHolds.flatMap(h => h.seatCodes),
            ...bookings.flatMap(b => b.seatCodes)
        ];

        const availableSeats  = event.seats.filter(seat => !blockedSeats.includes(seat));

        return res.status(200).json({ availableSeats });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}