import undoable from 'redux-undo'

import { prepend, reject, propEq, uniqBy, prop, compose } from 'ramda'
import { updateBy } from 'ramda_ext'

function reducer(state = [], action) {
  switch (action.type) {
    case 'USERS.LOAD':
      return action.users
    case 'USERS.ADD':
      return uniqBy(prop('id'), prepend(action.user, state))
    case 'USERS.REMOVE':
      return reject(propEq('id', action.user.id), state)
    case 'USERS.UPDATE':
      return updateBy(action.user, propEq('id', action.user.id), state)
    default:
      return state
  }
}

export default undoable(reducer, {
  initial: [],
  filter: function filterActions(action) {
    return !action.type.match(/LOAD|REQUEST/) && !(action.type === 'ADD' && action.user.current)
  }
})
