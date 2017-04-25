import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import axios from 'axios'

class Poll extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedOption: 0,
      newOption: ''
    }
    this.vote = this.vote.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  showOptions(){
    let survey = {}
    let index = this.props.params.index
    for( var i=0; i<this.props.poll.polls.length; i++){
      if(this.props.poll.polls[i]._id === index){
        survey = this.props.poll.polls[i]
      }
    }
    if (this.props.poll.loggedIn){
      return(
        <div className="clearfix">
          <button onClick={(e)=>this.vote(e)}>Vote!</button>
          { this.props.poll.user.username === survey.owner ?
              <button className='floatRight' onClick={(e)=>this.deleteSurvey(e)}>Delete this survey</button>
              :
              ''
          }
        </div>
      )
    } else {
      return(
        <div><h3><a href="/auth/github">Log in for Options</a></h3></div>
      )
    }
  }
  deleteSurvey(e){
    e.preventDefault()
    let survey = {}
    let index = this.props.params.index
    for( var i=0; i<this.props.poll.polls.length; i++){
      if(this.props.poll.polls[i]._id === index){
        survey = this.props.poll.polls[i]
      }
    }
    axios({
      method: 'post',
      url: '/deletesurvey/',
      data: {id: survey._id}
    }).then( res => {
      this.props.router.push('/')
    })
  }

  handleFormChange(e){
    if(e.target.type === 'text'){
      this.setState({newOption: e.target.value})
    } else {
      this.setState({selectedOption: +e.target.value})
    }
  }

  vote( event ){
    event.preventDefault()
    let survey = {}
    let index = this.props.params.index
    for( var i=0; i<this.props.poll.polls.length; i++){
      if(this.props.poll.polls[i]._id === index){
        survey = this.props.poll.polls[i]
      }
    }

    let data = {
      poll: survey._id,
      username: this.props.poll.user.username,
      vote: this.state.selectedOption,
      newOption: this.state.newOption
    }

    this.setState({selecetOption: -1, newOption:''})
    axios({
      method: 'post',
      url: '/vote/',
      data: data
    }).then( res => {
      console.log(res)
      this.props.actions.setOnePoll(res.data)
    })
  }

  render(){
    let survey = {}
    let index = this.props.params.index
    for( var i=0; i<this.props.poll.polls.length; i++){
      if(this.props.poll.polls[i]._id === index){
        survey = this.props.poll.polls[i]
      }
    }
    return(
      <div className='survey'>
        <h1>{survey.description}</h1>
        <h3>Survey Creator: {survey.owner}</h3>
          <form>
          {survey.choices.map( (choice, index) => {
            return (
              <div className='choice clearfix' key={index }>
                <label>
                  <input type="radio" value={index} name="choice"
                         disabled={!this.props.poll.loggedIn}
                         onChange={(e)=>this.handleFormChange(e)}
                         checked={this.state.selectedOption === index}/>
                  {choice.value + " votes:" + choice.votes}
                </label>
              </div>
            )
          })}
          <div className='choice clearfix'>
            <label>
              <input type="radio" value={survey.choices.length} name="choice"
                     disabled={!this.props.poll.loggedIn}
                     onChange={(e)=>this.handleFormChange(e)}
                     checked={this.state.selectedOption === survey.choices.length}/>
              <input className="txtInput" type="text" value={this.state.newOption} placeholder="Add a new value"
                     name="choice" disabled={!this.props.poll.loggedIn}
                     onChange={(e)=>this.handleFormChange(e)}/>
            </label>
          </div>
         {this.showOptions()}
         </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    poll: state.poll
  })
}
const mapDispatchToProps = (dispatch) => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(Poll)
