import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import activities from 'activities/activities_reducer'

const reducer = combineReducers({ activities })
const middleware = applyMiddleware(thunk)

export default createStore(reducer, middleware)
