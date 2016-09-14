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
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');

/***********************************
 * App creation
 ************************************/
dotenv.load(); // load environment variables
var app = express(); // create express app

var http=require("http");
var server=http.createServer(function (request,response){
  response.writeHead(200,{"content-type":"text/html"});
    response.write("kljjkl");
})
server.listen(3001);

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
 * Set up app properties
 ************************************/
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('env',  process.env.ENVIRONMENT);
app.set('port', process.env.PORT || process.env.DEFAULT_APP_HTTP_LISTENING_PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

/***********************************
 * Controllers
 ************************************/
var dashboardController = require('./controllers/dashboard');
var logonController = require('./controllers/logon');

app.get('/', logonController.index);
app.get('/logon', logonController.index);
app.get('/logon/token-exchange', logonController.tokenExchange);
app.get('/dashboard', dashboardController.index);

/***********************************
 * Environment, Exception handling & logging
 ************************************/
app.use(Logger.getRequestLogger());

if (app.get('env') === 'production') {
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
