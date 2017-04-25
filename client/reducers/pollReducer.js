const SET_USER = require('../actions').SET_USER
const RESET_USER = require('../actions').RESET_USER
const SET_POLLS = require('../actions').SET_POLLS
const SET_ONE_POLL = require('../actions').SET_ONE_POLL

const INITIAL_STATE = {
  loggedIn: false,
  polls: [],
  user: {displayName: '',
         username: ''}
}
function pollReducer(state, action){
  if(state===undefined) state=INITIAL_STATE
  switch(action.type){
    case SET_USER:
      return Object.assign({}, state, {loggedIn: true, user: action.payload})
    case RESET_USER:
      return Object.assign({}, state, {loggedIn: false, user:{displayName: '', username: ''}})
    case SET_POLLS:
      return Object.assign({}, state, {polls:action.payload})
    case SET_ONE_POLL:
      var polls = []
      state.polls.map( function(item){
        if( item._id !== action.payload._id){
          polls.push(item)
        } else if( item._id === action.payload._id){
          polls.push(action.payload)
        }
      })
      return Object.assign({}, state, {polls: polls})

    default:
      return state
  }
}
module.exports = pollReducer
