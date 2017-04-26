var path = process.cwd() + '/server'
var store = require('../../client/store')
var authUser = require('../../client/actions').authUser
var Poll = require('../models/poll')

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

  app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/login',
        successRedirect: '/' })
     )

  //log out of passport, destroy session, return to index
  app.get('/logout', function(req,res){
    req.logout()
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    })
  })

   //Return the session value when the client checks
   app.get('/sessionInfo', function(req,res){
     if(req.isAuthenticated()){
       console.log(req.session)
       res.json({user: req.session.passport.user.github,
                 polls: req.session.polls || [],
                })
     } else {
       res.json({user: {username: '', displayName: ''}})
     }
   });

   app.get('/polls', function(req, res){
       Poll.find({}, function(err, result){
         if(err) throw err;
         req.session.polls = result
         res.json({ polls: req.session.polls})
      })
    })

   app.post('/vote', function(req, res){
     /*var qry = {}
     if(req.body.newOption !== ''){
       qry = {$push: {"choices": { value: req.body.newOption,
                                   votes: 1,
                                   created_by: req.body.username}}}
     } else {
       qry = {$inc: {}}
     }*/
     Poll.findById(req.body.poll, function(err, poll){
       if(err) throw err
       var index = req.body.vote
       if( poll.choices.length === req.body.vote){
         poll.choices.push({ value: req.body.newOption,
                             votes: 1,
                             created_by: req.body.username})
       } else {
         poll.choices[index].votes++
       }
       poll.voters.push(req.body.username)
       poll.save(function(err, data){
         if(err) throw err
         res.json(data)
       })
     })
   })

   app.post('/addsurvey', function(req,res){
     var newPoll = new Poll({
       owner: req.body.owner,
       description: req.body.description,
       choices: req.body.choices,
       voters: []
     })
     newPoll.save(function(err, data){
       if(err) throw err
       res.json(data)
     })
   })

   app.post('/deletesurvey', function(req,res){
     Poll.remove({_id: req.body.id}, function(err){
       if (err) {
         console.log(err)
         throw err
       }
       res.status(200).send()
     })
   })
}
