var path = process.cwd()
var store = require('../client/store')
var authUser = require('../client/actions').authUser
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
      console.log('hi', req.user, store.getState())

      res.sendFile( path + '/views/index.html')
    })

  app.route('/login')
    .get( function(req, res){
      res.sendFile( path + '/views/login.html')
  })

  app.route('/auth/github')
  .get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get( function(req, res, next){
      passport.authenticate('github', function(err, user, info) {
      if (user === false) {
        // handle login error ...
      } else {
        res.status(200).send()
        store.dispatch(authUser())
      }
    })(req, res, next)
  })

}