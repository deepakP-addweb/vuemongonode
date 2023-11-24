'use strict';

var mongoose = require('mongoose'),
    Note = mongoose.model('Notes');


exports.getNotes = async (req, res) => {
        try {
          Note.find()
            .then((allNotes) => {
              res.status(200)
                .json({
                  success: true,
                  allNotes
                })
            })
            .catch((error) => {
              res.status(404)
                .json({
                  success: false,
                  message: "Cant find Notes",
                  error
                })
            })
        } catch (error) {
          res.status(500)
            .json({
              success: false,
              message: "Internal server error",
              error: error.message
            })
        }
}

exports.createNote = async (req, res) => {

    try {
      const noteData = await req.body;
      
      await Note.create(noteData)
        .then((createdNote) => {
          if (!createdNote) return res.status(404)
            .json({
              success: false,
              message: "Note creation failed",
              error: "Unable get created Note"
            })
          res.status(201)
            .json({
              success: true,
              createdNote
            })
        })
        .catch((error) => {
          res.status(404)
            .json({
              success: false,
              error: error.message
            })
        })
    } catch (error) {
      res.status(500)
        .json({
          success: false,
          message: "Internal server error"
        })
    }
  }

exports.readNote = async function (req, res) {

    Note.findById(req.params.noteId, function (err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};