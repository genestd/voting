// server.js
// where your node app starts
require('dotenv').config()
var session = require('express-session')
var passport = require('passport')
require('./auth/passport')(passport);
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://' + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB)
var routes = require('./routes')

// init project
var express = require('express');
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())
app.use(session({
  secret: "rockthevote",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 5, httpOnly: false }
}))

app.use(passport.initialize())
app.use(passport.session())

routes(app, passport)
//Start persistent session for user

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('server/public'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
