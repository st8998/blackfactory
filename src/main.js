import 'inputs/input_text.css'
import 'button/button.css'
import 'bg_colors/bg_colors.css'
import './main.css'

import React from 'react'
import { Provider, connect } from 'react-redux'
import { render } from 'react-dom'
import { Link, Router, Route, Redirect, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from 'users/users_reducer'
import teamReducer from 'users/team/team_reducer'
import rolesReducer from 'roles/roles_reducer'

import Header from 'header/header'
import Team from 'users/team'
import Profile from 'users/profile'
import ProfileEdit from 'users/profile_edit'
import Roles from 'roles/roles'

const reducer = combineReducers({
  users: usersReducer,
  team: teamReducer,
  routing: routerReducer,
  roles: rolesReducer,
})

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware)

const history = syncHistoryWithStore(hashHistory, store)

const App = ({ children }) => (
  <div>
    <Header />

    { children }
  </div>
)

const NotFound = () => <div className="centered-container"><h1>NOT FOUND</h1></div>

render((
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <Route path="/roles" component={ Roles }></Route>
        <Route path="/team" component={ Team }></Route>
        <Route path="/profile/:id" component={ Profile }></Route>
        <Route path="/profile/:id/edit" component={ ProfileEdit }></Route>
        <Route path="/notfound" component={NotFound}></Route>
        <Redirect from="/**" to="/notfound"></Redirect>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))

