'use strict';

module.exports = function (app) {
    var noteList = require('../controllers/noteController');

//missed parentesis
    app.route('/notes')
        .get(noteList.getNotes)
        .post(noteList.createNote);


    app.route('notes/:noteId')
        .get(noteList.readNote);

};