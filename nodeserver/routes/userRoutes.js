'use strict';
module.exports = function (app) {
    var userList = require('../controllers/userController');
    var noteList = require('../controllers/noteController');

//missed parentesis

    // User Routes
    app.route('/users')
        .get(userList.getUsers)
        .post(userList.createUser);
    
    app.route('/user/login')
        .post(userList.userLogin);
    
    app.route('/user/logout')
        .post(userList.loggedOut);

    // Notes Route
    app.route('/notes')
        .get(noteList.getNotes)
        .post(noteList.createNote);


    app.route('notes/:noteId')
        .get(noteList.readNote);

};   