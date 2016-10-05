/***********************************
 * logon controller expose UI to enable users sign in and manage authentication flow with Strava
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var Logger = require('../lib/logger');

/***********************************
 * Private functions
 ************************************/

/***********************************
 * rendering functions
 ************************************/

/**
 * welcome screen
 *
 * @param {req} request
 * @param {res} response
 */
function renderWelcome(req,res){
  res.render('welcome', {
    title: 'Welcome', user: req.user,json:JSON.stringify(req.user),
    layout: 'single-page'
  });
}

/***********************************
 * Module exports.
 ************************************/
module.exports={
    index :function(req, res) {
      renderIndex(req,res);
    },
    welcome :function(req, res) {
      renderWelcome(req,res);
    }
}