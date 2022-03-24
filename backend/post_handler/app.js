const express = require('express');
const app = express();
const offersRoute = require('./routes/offers');
const requestsRoute = require('./routes/requests');

app.use(express.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/posts', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', () => { console.log('Connected  – running on port 7000'); });

app.use(express.json());
app.use('/offers', offersRoute);
app.use('/requests', requestsRoute);

app.listen(7000);
