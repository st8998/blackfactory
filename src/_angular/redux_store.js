import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import activities from 'activities/activities_reducer'
import users from 'users/users_reducer'

const reducer = combineReducers({ activities, users })
const middleware = applyMiddleware(thunk)

export default createStore(reducer, middleware)
