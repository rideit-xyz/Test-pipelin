module.exports = {
  'strava-login': {
  'provider': 'strava',
  'module': 'passport-strava',
  'profileFields': ['gender', 'link', 'locale', 'name', 'timezone','verified', 'email', 'updated_time'],
  'clientID': process.env.STRAVA_CLIENT_ID,
  'clientSecret': process.env.STRAVA_CLIENT_SECRET,
  'callbackURL': process.env.STRAVA_CALLBACK_URL,
  'authPath': '/auth/strava',
  'callbackPath': '/auth/strava/callback',
  'successRedirect': '/auth/welcome',
  'failureRedirect': '/login',    
  'failureFlash': true
  }
};