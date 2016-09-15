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
    }
}