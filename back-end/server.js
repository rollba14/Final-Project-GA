require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const path = require('path');

var cors = require('cors')
var router = require('./config/routes.js');

// from tutorial
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

// app.use(cors())
// app.options('/login', cors())
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  credentials: true,
}
// if(!process.env.DYNO){
  app.use(cors(corsOptions));
// }



//CORS setup to allow other ports from this host
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//   next();
// });

// app.use(router);

///// FROM TUTORIAL ////////////////////////////////////////
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'pandaexpressishorrible'} )); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persisten login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(express.static(__dirname + '/dist'));

 app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname + '/dist/index.html'));
 });

// error handlers
// Catch unauthorised errors
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : err.name + ": " + err.message});
//   }
// });

// routes ======================================================================
router(app, passport); // load our routes and pass in our app and fully configured passport
////////////////////////////////////////////////////////////

let port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});
