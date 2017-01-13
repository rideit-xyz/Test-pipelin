/***********************************
 * Module dependencies. 
 ************************************/
//var express = require('express');
//var path = require('path');
//var compression = require('compression');
//var methodOverride = require('method-override');
//var session = require('express-session');

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var exphbs = require('express-handlebars');
var path = require('path');
var passport = require('passport');
var connectEnsureLogin=require('connect-ensure-login');
var Logger = require('./lib/logger');
var loopback = require('loopback');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');



/***********************************
 * App creation
 ************************************/
dotenv.config();
var app = loopback();

/***********************************
 * Templating
 ************************************/
var hbs = exphbs.create({  
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
// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// attempt to build the providers/passport config
var config = {};
config = require('../providers.js');

/***********************************
 * Set up app properties & pre-processing middleware
 ************************************/
app.engine('handlebars', hbs.engine);
app.engine('handlebars', exphbs({
        defaultLayout: 'main', 
        extname: '.handlebars',
        layoutsDir:'server/views/layouts',
        partialsDir:'server/views/partials'
}));

app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, '/views'));
// boot scripts mount components like REST API
boot(app, __dirname);
// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));
// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));
app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());
//app.use(express.static(path.join(__dirname, 'client')));
app.use(Logger.getRequestLogger());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


/***********************************
 * Controllers
 ************************************/
var landingController = require('./controllers/landing');
var logonController = require('./controllers/logon');
var dashboardController = require('./controllers/dashboard');

app.get('/', landingController.index);
app.get('/howitworks', landingController.howitworks);
app.get('/login', landingController.index);
app.get('/auth/logout',connectEnsureLogin.ensureLoggedIn(),logonController.index);
app.get('/auth/welcome',connectEnsureLogin.ensureLoggedIn(), logonController.welcome);


/***********************************
 * App initialization
 ************************************/
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

/***********************************
 * Module exports.
 ************************************/
module.exports = app;
