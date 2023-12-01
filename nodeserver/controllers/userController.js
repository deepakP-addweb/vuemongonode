'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');
const dotenv = require('dotenv');
const Jwt = require('jsonwebtoken');


exports.userLogin = async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    //const token = jwt.sign(user, process.env.JWT_KEY);
    const userData = await req.body;
    console.log(userData);
    console.log(jwtSecretKey);
    try { 
        // check if the user exists 
        const user = await User.findOne({ email: req.body.email });
        console.log('user:'+user);
        if (user) {
            const result = req.body.name === user.name;
            user.isLoggedIn = 1;
        // Create JWT Token
        Jwt.sign({ user }, jwtSecretKey,{ expiresIn : "2h"},(error,token)=>{
            console.log('token:'+token);
             if(error){
                res.status(400)
                .json({
                  success: false,
                  message: "something went wrong.",
                  error
                })
             }
             if (result) { 
                res.status(200)
                    .json({
                      success: true,
                      token:token,
                      user
                    })
              }else {
                res.status(400)
                    .json({
                      success: false,
                      message: "email doesn't match",
                      error
                    })
              }
          })
          //check if password matches 
        } else {
            User.create(userData)
                    .then((user) => {
                        if (!user) return res.status(404)
                            .json({
                                success: false,
                                message: "User creation failed",
                                error: "Unable get created User"
                            })
                        Jwt.sign({ user }, jwtSecretKey,{ expiresIn : "2h"},(error,token)=>{
                            console.log('token:'+token);
                            if(error){
                                res.status(400)
                                .json({
                                success: false,
                                message: "something went wrong.",
                                error
                                })
                            }
                            res.json({
                                success: true,
                                message: "User creation successfully",
                                token:token,
                                user
                            })
                        })
                        console.log('user:'+user);
                    })
                    .catch((error) => {
                        res.status(404)
                            .json({
                                success: false,
                                error: error.message
                            })
                    })
        } 
      } catch (error) { 
        res.status(400)
                .json({
                  success: false,
                  message: "Something went wrong",
                  error
                }) 
        } 
    }
 
exports.loggedOut = async (req, res) => {
    const userData = await req.body;
    console.log('logoutfunction');
    console.log(userData.email);
    try { 
        const user = await User.findOne({ email: userData.email });
        if (user) {
            user.loggedIn = 0;
            user.save();
            res.status(200)
                .json({
                  success: true,
                  message: "Logout user",
                  user
                }) 
           }else{
            res.status(400)
                .json({
                  success: false,
                  message: "User not found",
                }) 
              }
        } catch (error) {
                res.status(500)
                  .json({
                    success: false,
                    message: "Internal server error",
                    error: error.message
                  })
        }
}

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
        var userStatus = 0;
        console.log(userData);
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        console.log(jwtSecretKey);
            User.create(userData)
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