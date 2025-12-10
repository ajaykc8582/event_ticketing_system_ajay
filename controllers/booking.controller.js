"use strict";

const Event = require('../models/Event');
const Hold = require('../models/Hold');
const Booking = require('../models/Booking');

exports.confirmBooking = async (req, res) => {
    try {
        const idempotencyKey = req.header('Idempotency-Key');

        const existingBooking = await Booking.find({ idempotencyKey });
        if (existingBooking && existingBooking.length > 0) {
            return res.json(existingBooking);
        }
        
        const hold = await Hold.findOne({
            _id: req.params.id,
            status: 'active',
            expiresAt: { $gt: new Date() }
        });

        if(!hold){
            return res.status(400).json({ message: 'Hold is invalid or expired' });
        }

        const event = await Event.findById(hold.eventId);

        const booking = await Booking.create({
            eventId: hold.eventId,
            userId: hold.userId,
            seatCodes: hold.seatCodes,
            total: hold.seatCodes.length * event.price,
            idempotencyKey
        });

        hold.status = 'confirmed';
        await hold.save();

        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}