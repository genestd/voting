import React from 'react'
import VoteNav from '../components/VoteNav'
import Home from '../components/Home'
import Footer from '../components/Footer'

const App = (props) => {
  return (
    <div className='fullHeight'>
      <div className='fullHeight'>
        <VoteNav />
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}

export default App
