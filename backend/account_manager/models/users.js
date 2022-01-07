const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    // userOrg: {type: String, required: true},
    // postalCode: {type: String, required: true},
    // orgName: {type: String, required: false}

}, {timestamp: true});

module.exports.Users = mongoose.model('users', userSchema);