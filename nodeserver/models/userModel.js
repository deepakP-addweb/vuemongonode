'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        Required: 'Please enter Name'
    },
    email: {
        type: String,
        Required: 'Please enter email'
    },
    loggedIn: {
        type: String,
        default: '1'
    },
    Created_date:{
        type: Date,
        default :Date.now

    },

});

//one o instead of 2
module.exports = mongoose.model('Users', UserSchema);