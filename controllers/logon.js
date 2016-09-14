/***********************************
 * logon controller expose UI to enable users sign in and manage authentication flow with Strava
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var Logger = require('../lib/logger');
var strava = require('strava-v3');

/***********************************
 * Private functions
 ************************************/

/**
 * build sign-in-end-point based on environment variables and manage production VS Dev(stubbed environement)
 * @return {signinEndPoint} Full URL targetted by "connect with Strava" button 
 */
function buildSignInEndPoint (){
  var signInEndPoint;
  var args={};
  signInEndPoint=strava.oauth.getRequestAccessURL(args);
  Logger.getLogger().info('Sign In End point on ' + signInEndPoint);
  return signInEndPoint;
}

/**
 * Get Strava authentication token for the current users 
 * @param {code} dynamic code given by strava following initiation of authentication flow
 */
function tokenExchange (code){
  strava.oauth.getToken({'code':code},function(err,payload) {
            if(!err) {
                Logger.getLogger().info(payload);
            }
            else {
                Logger.getLogger().info(err);
            }
        }); 
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
  res.render('signin', {
    title: 'Sign in',    
    signInEndPoint:buildSignInEndPoint(),
    layout: 'logon'
  });
}

/***********************************
 * Module exports.
 ************************************/
module.exports={
    index :function(req, res) {
      renderIndex(req,res);
    },
    tokenExchange :function(req, res) {
      tokenExchange(req.params.code);
      renderIndex(req,res);
    }
}