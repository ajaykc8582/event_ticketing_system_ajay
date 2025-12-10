const express = require('express');
const router = express.Router();
const controller = require('../controllers/booking.controller');


router.post("/:id/confirm", controller.confirmBooking);


module.exports = router;