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

/**
 * build sign-in-end-point based on environment variables and manage production VS Dev(stubbed environement)
 * @return {signinEndPoint} Full URL targetted by "connect with Strava" button 
 */
function buildSignInEndPoint (){
  return process.env.STRAVA_SIGN_IN_END_POINT_URI;
}

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
    signInEndPoint:buildSignInEndPoint(),
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