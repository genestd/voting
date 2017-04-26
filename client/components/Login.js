import React from 'react'

class Login extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='login'>
        <a href='/auth/github/'>Login with Github <i className="icon-github"></i></a>
      </div>
    )
  }
}

export default Login
