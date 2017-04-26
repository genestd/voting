import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import store from '../../client/store'
import App from '../../client/components/App'
import Home from '../../client/components/Home'
import Poll from '../../client/components/Poll'
import AddPoll from '../../client/components/AddPoll'
import Login from  '../../client/components/Login'
import NotFound from '../../client/components/NotFound'
import '../../client/styles/main.scss'

ReactDOM.render(
  (<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path='/poll/:index' component={Poll}/>
        <Route path='/mypoll/:index' component={Poll}/>
        <Route path='/add' component={AddPoll}/>
        <Route path="/Login" component={Login}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>), document.getElementById('app') );
