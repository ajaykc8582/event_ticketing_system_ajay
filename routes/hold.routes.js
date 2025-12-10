const express = require('express');
const router = express.Router();
const controller = require('../controllers/hold.controller');


router.post("/", controller.createHold);


module.exports = router;