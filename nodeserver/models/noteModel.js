'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        Required: 'Please enter title'
    },
    content: {
        type: String,
        Required: 'Please enter content'
    },
    user_id: {
        type: String,
        Required: 'Please enter userid'
    },
    Created_date:{
        type: Date,
        default :Date.now

    },

});

//one o instead of 2
module.exports = mongoose.model('Notes', NoteSchema);