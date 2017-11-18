require('dotenv').config();
// ^ you don't have a dotenv though
// the .env file should also have your secret ('pandaexpressishorrible')

const express      = require('express');
const bodyParser   = require('body-parser');
const app          = express();
const cors         = require('cors')
const router       = require('./config/routes.js');
const passport     = require('passport');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const path         = require('path');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  credentials: true,
}

if(!process.env.DYNO){
  app.use(cors(corsOptions));
}

require('./config/passport')(passport); // pass passport for configuration

// set up Express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// PASSPORT
app.use(session({ secret: 'pandaexpressishorrible'} )); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persist login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(__dirname + '/dist'));

// ROUTES
router(app, passport);

let port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});
