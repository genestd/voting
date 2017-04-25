import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import Poll from '../components/Poll'
import AddPoll from '../components/AddPoll'
import NotFound from '../../client/components/NotFound'

let routes =
(
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path='/poll/:index' component={Poll}/>
      <Route path='/mypoll/:index' component={Poll}/>
      <Route path='/app/' component={AddPoll}/>
      <Route path='*' component={NotFound} />
    </Route>
)
export default routes
