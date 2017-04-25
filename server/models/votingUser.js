var mongoose=require('mongoose')
var Schema = mongoose.Schema

var VotingUser = new Schema({
  github: {
    id: String,
    username: String,
    displayName: String,
    repos: Number
  }
})

module.exports = mongoose.model('VotingUser', VotingUser)