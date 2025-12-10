const express = require('express');
const router = express.Router();
const controller = require('../controllers/event.controller');

router.get('/:id/seats', controller.getAvailableSeats);


module.exports = router;