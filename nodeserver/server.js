var cors = require('cors');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3006,
    mongoose = require('mongoose'),
    User = require('./models/userModel'),
    Note = require('./models/noteModel'),
    bodyParser = require('body-parser');
    const socketIO = require('socket.io');
    const http = require('http');
const dotenv = require('dotenv');
const Jwt = require('jsonwebtoken');
var router = express.Router();
var Note = require('./models/noteModel');
dotenv.config();
mongoose.Promise = global.Promise;
//userdb not users
//mongoose.connect('mongodb://localhost/Userdb');
//mongoose.connect('mongodb+srv://deepak:deepak@user.fq4fdkz.mongodb.net/?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://deepakp:addweb123@cluster0.grhqf3c.mongodb.net/?retryWrites=true&w=majority');

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
/// define the server port
app.use(cors({
// Access-Control-Allow-Origin: "*",
    origin: "*",
    methods: ["GET", "POST"],
}))
//app.use(cors());

 //let SocketConnection

// function that handles socket.io connections
io.on('connection', (socket) => {
    // console.log(socket);
    // on connect print user connected msg
    console.log('A user connected.');
    //SocketConnection = socket
    // on socket disconnect
    socket.on('disconnect', () => {
        // print user disconnect msg
        console.log('A user disconnected.');
    });
    // Handle custom 'hello' event
    socket.on('save-note', function (data) {
        console.log('Socket Server: Save Note');
        //console.log(data);
        io.emit('new-notes', { note: data });
        console.log('Socket Server: Added Note');
      });
    
    socket.on('login-name', function (data) {
        console.log('Socket Server: get Login');

        io.emit('get-name', data);
        console.log('Socket Server: Send Name');
      });
    
});

//Validate JWT Token Middleware
function verifyToken(req,res,next){
    console.log(req.originalUrl);
    if(req.originalUrl=="/user/login" || req.originalUrl=="/user/logout"){
        next();
    }else{
        let token = req.headers['authorization'];
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        //console.log(req.headers);
        //console.log(jwtSecretKey);
        if(token){
            token = token.split(' ')[1];
            console.log('Middleware token verify');
            Jwt.verify(token, jwtSecretKey, (error,result) => {
                if(error){
                    res.status(500)
                    .json({
                        success: false,
                        message: "Please provide valid token"
                    })
                }else{
                    next();
                }
            })
        }else{
        res.status(500)
            .json({
                success: false,
                message: "Please send Authorization token"
            })
        }
    }
    
  }
  app.use(verifyToken);
  
  module.exports= io
  //console.log(io);
//missed an s
var routes = require('./routes/userRoutes');

routes(app);

server.listen(port);

console.log('user List started on:' + port);


