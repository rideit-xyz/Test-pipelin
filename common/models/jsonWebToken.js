'use strict';

module.exports = function(JsonWebToken) { 
    /***********************************
     * Enable-disable API exposed methods
     ************************************/     

    /***********************************
     * Extend methods
     ************************************/ 
    //import
    JsonWebToken.createAccessTokenId = function(fn) {
      console.log("creation of token JWT");
    uid(this.settings.accessTokenIdLength || DEFAULT_TOKEN_LEN, function(err, guid) {
      if (err) {
        fn(err);
      } else {
        fn(null, guid);
      }
    });
  };
};
