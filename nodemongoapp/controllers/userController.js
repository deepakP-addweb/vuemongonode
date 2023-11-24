'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

//Get All Users List
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

//Create User from Login
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

//Generate JWT Token 
exports.generateToken = async (req, res) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
        }
        const token = jwt.sign(data, jwtSecretKey);
        res.status(201)
            .json({
                success: true,
                token
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

//Validate JWT Token
exports.validateToken = async (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(req.Authorization);

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            res.status(201)
                .json({
                    success: true,
                    message:"1"
                })
        }else{
            // Access Denied
            res.status(401)
                .json({
                    success: false,
                    message: "You are not valid user"
                })
        }
    } catch (error) {
        // Access Denied
        res.status(500)
            .json({
                success: false,
                message: "Internal server error",
                error: error.message
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
