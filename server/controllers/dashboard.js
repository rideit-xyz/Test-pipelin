/***********************************
 * dashboard controller expose UI to visualise logged athlete dashboard (multiple widgets)
 ************************************/
 
/***********************************
 * Module dependencies.
 * @private
 ************************************/
 var strava = require('strava-v3');

 /***********************************
 * Private constants.
 ************************************/

/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/
function getFavoriteSegment(){
  var segmentListStarred;
  strava.segments.listStarred(function(err,payload) {
            segmentListStarred=payload;
  });
  return segmentListStarred;
}

/***********************************
 * rendering functions
 ************************************/

/**
 * render home dashboard screen
 *
 * @param {req} request
 * @param {res} response
 */
function renderIndex(req,res){
  res.render('dashboard', {
    title: 'Dashboard', user: req.user
  });
}

/***********************************
 * Module exports.
 ************************************/
module.exports={
    index :function(req, res) {
      renderIndex(req,res);
    }
};