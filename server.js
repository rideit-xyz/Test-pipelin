/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var path = require('path');
var compression = require('compression');
var methodOverride = require('method-override');
var Logger = require('./lib/logger');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
var passport = require('passport');
var StravaStrategy = require('passport-strava').Strategy;
var connectEnsureLogin=require('connect-ensure-login');
var globalTunnel = require('global-tunnel');


/***********************************
 * App creation
 ************************************/
dotenv.load(); // load environment variables
var app = express(); // create express app

/***********************************
 * Templating
 ************************************/
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    },
    section: function(name, options){ 
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this); 
        return null;
    } 
  }
});

/***********************************
 * Set up passport
 ************************************/
// Configure the Strava strategy for use by Passport.
passport.use(new StravaStrategy({
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALL_BACK_URI    
  },
  function(accessToken, refreshToken, profile, cb) {
    Logger.getLogger().info(profile);
    return cb(null, profile);
  }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/***********************************
 * Set up app properties
 ************************************/
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('env',  process.env.ENVIRONMENT);
app.set('port', process.env.PORT || process.env.DEFAULT_APP_HTTP_LISTENING_PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(Logger.getRequestLogger());

//globalTunnel.initialize();


/***********************************
 * Controllers
 ************************************/
var landingController = require('./controllers/landing');
var logonController = require('./controllers/logon');
var dashboardController = require('./controllers/dashboard');

app.get('/', landingController.index);
app.get('/login', landingController.index);
app.get('/login/strava',passport.authenticate('strava'));
app.get('/login/strava/call-back', 
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/welcome');
  });
app.get('/logout',connectEnsureLogin.ensureLoggedIn(),logonController.index);
//app.get('/dashboard',connectEnsureLogin.ensureLoggedIn(), dashboardController.index);
app.get('/welcome', logonController.welcome);


/***********************************
 * Environment, Exception handling & logging
 ************************************/
if (process.env.ENVIRONMENT === 'production') {
  app.use(function(err, req, res, next) {
    Logger.getLogger().error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

/***********************************
 * App initialization
 ************************************/
app.listen(app.get('port'), function() {  
  Logger.getLogger().info('Express server listening on port ' + app.get('port'));
});

/***********************************
 * Module exports.
 ************************************/
module.exports = app;
