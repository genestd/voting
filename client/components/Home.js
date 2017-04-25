import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import Poll from '../components/Poll'
import axios from 'axios'
import {Link} from 'react-router'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.checkLogin = this.checkLogin.bind(this)
    this.getPolls = this.getPolls.bind(this)
  }

  render(){
    var polls = [], myPolls = []
    myPolls = this.props.poll.polls.map( (item, index)=> {
      if(item.owner === this.props.poll.user.username){
        return(  <div key={item._id} className='content surveys'>
                  <Link to={'/poll/'+item._id}>{item.description}</Link>
                 </div>
              )
      }
    })
    polls = this.props.poll.polls.map( (item,index)=>{
      if(item.owner !== this.props.poll.user.username){
        return ( <div key={item._id} className='content surveys'>
                    <Link to={'/mypoll/'+item._id}>{item.description}</Link>
                  </div>
              )
      }
    })
    return(
      <div className="content">
        <h1>{"Hello " + this.props.poll.user.username}</h1>
        <div>
          <h1>My Surveys <i className='icon-arrows-ccw pointer' onClick={this.getPolls}></i></h1>
          {this.props.poll.loggedIn ? myPolls : <h3>Log in to view your surveys</h3>}
        </div>
        <div>
          <h1>All Surveys<i className='icon-arrows-ccw pointer' onClick={this.getPolls}></i></h1>
          {polls}
        </div>
      </div>
    )
  }

  checkLogin(){
    axios.get('/sessionInfo')
    .then( res=> {
      if (res.data.user.username != ''){
        if(!this.props.poll.loggedIn){
          console.log('authing',res)
          this.props.actions.setUser(res.data.user)
        }
      } else {
        console.log('not authorized',res)
        this.props.actions.resetUser()
      }
      this.getPolls()
    })
    .catch(err =>{
      console.log(err)
    })
  }

  getPolls(){
    axios.get('/polls')
    .then( res=>{
      this.props.actions.setPolls(res.data.polls)
      })

  }

  componentDidMount(){
    this.checkLogin()
  }
}

const mapStateToProps = (state) => {
  return( {poll: state.poll})
}
const mapDispatchToProps = (dispatch) => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
