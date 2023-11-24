var cors = require('cors');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./models/userModel'),
    Note = require('./models/noteModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//userdb not users
//mongoose.connect('mongodb://localhost/Userdb');
mongoose.connect('mongodb+srv://deepak:deepak@user.fq4fdkz.mongodb.net/?retryWrites=true&w=majority');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//missed an s
var routes = require('./routes/userRoutes');

routes(app);

app.listen(port);

console.log('user List started on:' + port);
