/***********************************
 * logger singleton to access and initialize application logger  
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var Winston = require('winston');
var Logger = require("express-winston-middleware");

/***********************************
 * Private constants.
 ************************************/
const FILE_LOG_LOCATION="logs/test.log";

/***********************************
 * Private properties
 ************************************/

var _logger = new Logger.Log({
  transports:[
    new (Winston.transports.File)({filename:FILE_LOG_LOCATION})
  ]
});

var _requestLogger = new Logger.request({
  transports: [
    new (Winston.transports.File)({ json: true,filename:FILE_LOG_LOCATION})
  ]
})

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    getLogger:function(){
       return _logger;
    },

    getRequestLogger:function(){
       return _requestLogger;
    }
}
