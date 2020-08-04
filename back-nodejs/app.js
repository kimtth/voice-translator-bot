var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const messageRouter = express.Router();
const usersRouter = express.Router();
const channelRouter = express.Router();
const cors = require('cors')
require('./routes/message_route')(messageRouter);
require('./routes/channel_route')(channelRouter);
require('./routes/user_route')(usersRouter);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);
const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  };
app.use(cors(corsOpts))

require("dotenv").config({ path: './.env' });
app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//for creating dummy data, Need to run only one-time.
//require('./createFakedata')

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    console.log('Express server listening on port ' + process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log('Connected to MongoDB')
        //for creating dummy data, Need to run only one-time.
        //createFakeData()
    })
    .catch(e => {
        console.error(e);
    })
});

module.exports = app;