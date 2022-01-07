const express = require("express");
const app = express();
const reportsRoute = require('./routes/reports');

// Connect to local MongoDB database
const mongoose = require("mongoose");
mongoose.connect('mongodb://mongodb:27017/reports', {useNewUrlParser: true, useUnifiedTopology: true});

// Display connection status upon running file
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', () => {console.log('database connected')});

// Initialize router
app.use('/reports', reportsRoute);

// Event listener
app.listen(3000);


