// server.js
// where your node app starts
var session = require('express-session')
var passport = require('passport')
require('./auth/passport')(passport);
var mongoose = require('mongoose')
var routes = require('./routes')
mongoose.connect('mongodb://' + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB)

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(session({
  secret: "rockthevote",
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

routes(app, passport)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
