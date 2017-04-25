import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import axios from 'axios'
import PropTypes from 'prop-types'

class AddPoll extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      question: '',
      options: [],
      selectedOption: '',
      newOption: ''
    }
  }

  handleQChange(event){
    this.setState({question: event.target.value})
  }
  handleOptionChange(event){
    this.setState({selectedOption: event.target.value})
  }
  handleNewOption(event){
    this.setState({newOption: event.target.value})
  }
  addOption(){
    if(this.state.newOption != ''){
      let opt = [{ value: this.state.newOption, created_by: this.props.poll.user.username, votes: 0 }]
      this.setState({
        newOption: '',
        options: this.state.options.concat(opt)
      })
    }
  }
  submitSurvey(e){
    e.preventDefault()
    if( this.state.options.length > 0 && this.state.question != ''){
      let data = {
        owner: this.props.poll.user.username,
        description: this.state.question,
        choices: this.state.options
      }
      axios({
        method: 'post',
        url: '/addsurvey/',
        data: data
      }).then( res => {
        console.log(this.props)
        this.props.actions.setOnePoll(res.data)
        this.props.router.push('/')
      })
    }
  }
  render(){
    return(
      <form className='survey'>
        <h1>Add A New Survey</h1>
        <div>
          <label>
            Ask a question: <input type="text" name="question" placeholder="ex: What kind of pet do you have?" value={this.state.question} onChange={(e)=>this.handleQChange(e)}/>
          </label>
        </div>
        <div>
          <div>Options:</div>
            {this.state.options.map( (option,index)=>{
              return (<div className='choice clearfix' key={index}>
                      <label>
                        <input type='radio' value={option.value} selected={this.state.selectedOption === option.value} onChange={(e)=>this.handleOptionChange(e)}/>
                        {option.value}
                      </label>
                      </div>)
            })}
            <label>Add option:
              <input className="inline" type="text" name="newOption" value={this.state.newOption} placeholder="Dog" onChange={(e)=>this.handleNewOption(e)}/>
              <i className="icon-plus-circled pointer" onClick={()=>this.addOption()}></i>
            </label>
        </div>
        <button onClick={(e)=>this.submitSurvey(e)}>Submit!</button>
      </form>
    )
  }
}
AddPoll.contextTypes = {
  router: PropTypes.object
};
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
module.exports = connect(mapStateToProps, mapDispatchToProps)(AddPoll)
