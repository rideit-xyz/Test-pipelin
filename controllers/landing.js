/***********************************
 * landing controller expose UI landing page
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
 * render logon screen
 *
 * @param {req} request
 * @param {res} response
 */
function renderIndex(req,res){
  res.render('landing', {
    title: 'Welcome',        
    layout: 'single-page'
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