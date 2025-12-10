"use strict";
const Hold = require('../models/Hold');
const Booking = require('../models/Booking');


exports.createHold = async (req, res) => {
    try {
        const { eventId, userId, seatCodes } = req.body;
        
        const conflict = await Hold.findOne({
            eventId,
            seatCodes: { $in: seatCodes },
            status: 'active',
            expiresAt: { $gt: new Date() }
        });

        const booked = await Booking.findOne({
            eventId,
            seatCodes: { $in: seatCodes }
        });

        if(conflict || booked){
            return res.status(409).json({ message: 'Seats already blocked' });
        }

        const hold = await Hold.create({
            eventId,
            userId,
            seatCodes,
            expiresAt: new Date(Date.now() + 120000) // 2 minutes TTL
        });

        return res.status(201).json({ hold } );
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}