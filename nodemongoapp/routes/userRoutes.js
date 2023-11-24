'use strict';

module.exports = function (app) {
    var userList = require('../controllers/userController');
    var noteList = require('../controllers/noteController');

//missed parentesis
    app.route('/users')
        .get(userList.getUsers)
        .post(userList.createUser);


    app.route('users/:userId')
        .get(userList.read_a_user);

    app.route('/notes')
        .get(noteList.getNotes)
        .post(noteList.createNote);


    app.route('notes/:noteId')
        .get(noteList.readNote);

};