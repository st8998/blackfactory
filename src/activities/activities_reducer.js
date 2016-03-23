import undoable from 'redux-undo'

import { prepend, reject, propEq } from 'ramda'
import { updateBy } from 'ramda_ext'

function reducer(state = [], action) {
  switch (action.type) {
    case 'ACTIVITIES.LOAD':
      return action.activities
    case 'ACTIVITIES.ADD':
      return prepend(action.activity, state)
    case 'ACTIVITIES.REMOVE':
      return reject(propEq('id', action.activity.id), state)
    case 'ACTIVITIES.UPDATE':
      return updateBy(action.activity, propEq('id', action.activity.id), state)
    default:
      return state
  }
}

export default undoable(reducer, {
  initial: [],
  filter: function filterActions(action) {
    return !action.type.match(/LOAD|REQUEST/)
  }
})
