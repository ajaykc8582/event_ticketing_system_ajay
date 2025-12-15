const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));


app.use("/events", require('./routes/event.routes'));
app.use("/bookings", require('./routes/booking.routes'));
app.use("/holds", require('./routes/hold.routes'));
app.use("/stats", require('./routes/stats.routes'));


module.exports = app;

