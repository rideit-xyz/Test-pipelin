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
 * render landing page (home screen)
 *
 * @param {req} request
 * @param {res} response
 */
function renderIndex(req,res){
  res.render('home', {
    title: 'Welcome',       
    layout: 'landing-page'
  });  
}

/**
 * render how it works page
 *
 * @param {req} request
 * @param {res} response
 */
function renderHowItWorks(req,res){
  res.render('how-it-works', {
    title: 'How it works',        
    layout: 'landing-page'
  });  
}

/***********************************
 * Module exports.
 ************************************/
module.exports={
    index :function(req, res) {
      renderIndex(req,res);
    },
    howitworks :function(req, res) {
      renderHowItWorks(req,res);
    }
};