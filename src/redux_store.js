import { createStore, combineReducers, applyMiddleware } from 'redux'

import { dbMiddleware } from 'db'
import thunk from 'redux-thunk'

import activities from 'activities/activities_reducer'

const reducer = combineReducers({ activities })
const middleware = applyMiddleware(dbMiddleware, thunk)

export default createStore(reducer, middleware)
