const express = require('express');
const router = express.Router();
const controller = require('../controllers/stats.controller');


router.get("/event/:id", controller.getStats);



module.exports = router;