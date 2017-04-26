var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Poll = new Schema({
  owner: String,
  voters: [],
  description: String,
  choices: [{
    value: String,
    votes: Number,
    created_by: String
  }]
})


module.exports = mongoose.model("Poll", Poll)
