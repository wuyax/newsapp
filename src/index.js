import React from 'react'
import {render} from 'react-dom'
import {Router, Route,IndexRoute, hashHistory,IndexRedirect} from 'react-router'
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
let user = localStorage.getItem('user');

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={NewsContainer}></IndexRoute>
      <Route path="/detail/:uniqueKey" component={NewsDetail}/>
      <Route path="/usercenter" component={UserCenter}/>
    </Route>
  </Router>
), document.getElementById('root'))
