/***********************************
 * import APIs will import data from strava within ride-it database for further datamining activities
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var Logger = require('../lib/logger');

/***********************************
 * Private functions
 ************************************/

/***********************************
 * rendering functions
 ************************************/

/**
 * import last year activities within ride-it database
 *
 * @param {req} request
 * @param {res} response
 */
function importActivities(req,res){
  Logger.getLogger().info('Importing activities:' + req.user.displayName);
  res.send('mlk');
}

/**
 * import activitiy detail within ride-it database 
 *
 * @param {req} request
 * @param {res} response
 */
function importActivityDetail(req,res){
  
}

/***********************************
 * Module exports.
 ************************************/
module.exports={
    importActivities :function(req, res) {
      importActivities(req,res);
    },
    importActivityDetail :function(req, res) {
      importActivityDetail(req,res);
    }
}