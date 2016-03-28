import './main.css'

import React from 'react'
import { Provider, connect } from 'react-redux'
import { render } from 'react-dom'
import { Link, Router, Route, hashHistory } from 'react-router'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from 'users/users_reducer'

import Header from 'header/header'

const reducer = combineReducers({ users: usersReducer })
const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware)

const App = ({ children }) => (
  <div>
    <Header />

    { children }
  </div>
)

render((
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))

