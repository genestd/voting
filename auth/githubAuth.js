var githubAuth = {
  clientID: process.env.CLIENT_KEY,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.APP_URL + 'auth/github/callback'
}
console.log(githubAuth)
module.exports = githubAuth;
