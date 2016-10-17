/***********************************
 * logon controller expose UI to enable users sign in and manage authentication flow with Strava
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var Logger = require('../lib/logger');
var base = require('airtable').base('appdK77fBnr8jkoUn');

/***********************************
 * Private functions
 ************************************/
/**
 * insert user in airtable
 *
 * @param {user} strava user 
 */
function insertUserInAirtable (user){
  base('strava').create({id:user.displayName,json:JSON.stringify(user)}, function(err, record) {
    if (err) { console.log(err); return; }
    console.log(record);
  });
}

/**
 * insert user in waiting list
 *
 * @param {email} user email
 * @param {importantChoice} priority of the user
 */
function insertUserInWaitingList (email,importantChoice){
  base('waitingList').create({email:email,importantChoice:importantChoice}, function(err, record) {
    if (err) { console.log(err); return; }
    console.log(record);
  });
}

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
  insertUserInAirtable(req.user);
  res.render('welcome', {
    title: 'Welcome', user: req.user,json:JSON.stringify(req.user),
    layout: 'single-page'
  });
}

/**
 * get on user waiting list screen
 *
 * @param {req} request
 * @param {res} response
 */
function renderGetOnWaitingList(req,res){
  insertUserInWaitingList(req.body.email, req.body.optionsRadiosImportant);
  res.render('get-on-waiting-list', {
    title: 'Get on our waiting list',
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
    },
    getonwaitinglist :function(req, res) {
      renderGetOnWaitingList(req,res);
    }
}