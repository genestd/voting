const SET_USER = 'SET_USER'
const RESET_USER = 'RESET_USER'
const SET_POLLS = 'SET_POLLS'
const SET_ONE_POLL = 'SET_ONE_POLL'

function setUser( user ){
  return {
    type: SET_USER,
    payload: user
  }
}
function resetUser(){
  return {
    type: RESET_USER
  }
}
function setPolls(polls){
  return{
    type: SET_POLLS,
    payload: polls
  }
}
function setOnePoll(poll){
  return{
    type: SET_ONE_POLL,
    payload: poll
  }
}

module.exports = {
  SET_USER,
  RESET_USER,
  SET_POLLS,
  SET_ONE_POLL,
  resetUser,
  setUser,
  setPolls,
  setOnePoll
}
