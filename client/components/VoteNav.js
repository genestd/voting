import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'

class VoteNav extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let logged = this.props.poll.loggedIn
    return (
      <div className='voteNav'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li>View Surveys</li>
          {logged ? (<li><Link to='/add'>Add a survey</Link></li>) : ''}
          {logged ? (<li><a href="/logout/">Sign Out</a></li> ): (<li><a href="/auth/github/">Sign In</a></li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    poll: state.poll})
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteNav)
