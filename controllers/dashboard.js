/***********************************
 * dashboard controller expose UI to visualise logged athlete dashboard (multiple widgets)
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/

/***********************************
 * Private functions
 ************************************/

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
    title: 'Dashboard'
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