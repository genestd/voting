var githubAuth = {
  clientID: process.env.CLIENT_KEY,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.APP_URL + ":" + process.env.PORT + '/auth/github/callback'
}
module.exports = githubAuth;
