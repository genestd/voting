var combineReducers = require('redux').combineReducers
var pollReducer = require ('../reducers/pollReducer')

const rootReducer = combineReducers({
  poll: pollReducer
})

module.exports = rootReducer
