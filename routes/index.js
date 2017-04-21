var path = process.cwd()
console.log(path)
module.exports = function(app, passport){

  function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next()
    } else {
      res.redirect('/login')
    }
  }

  app.route('/')
    .get( function(req, res){
      res.sendFile( path + '/views/index.html')
    })

  app.route('/login')
    .get( function(req, res){
      res.sendFile( path + '/views/login.html')
  })

  app.route('/auth/github')
  .get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

}
