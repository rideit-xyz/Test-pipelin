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
var _segmentListStarred;

/***********************************
 * Private functions
 ************************************/
function getFavoriteSegment(){
  strava.segments.listStarred(function(err,payload) {
            _segmentListStarred=payload;
  });
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
    title: 'Dashboard', user: req.user, segmentListStarred:_segmentListStarred,
  });
}

/***********************************
 * Module exports.
 ************************************/
module.exports={
    index :function(req, res) {
      renderIndex(req,res);
    }
}