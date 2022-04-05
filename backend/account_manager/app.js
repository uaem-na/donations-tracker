const express = require('express');
const app = express();
const usersRoute = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://mongodb:27017/users', { useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', () => console.log('database connected – running on port 4000'));

app.use('/users', usersRoute);

app.listen(5000);