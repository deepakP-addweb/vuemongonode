'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');


exports.getUsers = async (req, res) => {
        try {
            User.find()
            .then((allUsers) => {
              res.status(200)
                .json({
                  success: true,
                  allUsers
                })
            })
            .catch((error) => {
              res.status(404)
                .json({
                  success: false,
                  message: "Cant find ",
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

exports.createUser = async (req, res) => {

    try {
      const userData = await req.body;
      console.log(userData);
      await User.create(userData)
        .then((createdUser) => {
          if (!createdUser) return res.status(404)
            .json({
              success: false,
              message: "User creation failed",
              error: "Unable get created User"
            })
          res.status(201)
            .json({
              success: true,
              createdUser
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

exports.read_a_user = async function (req, res) {

    User.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};