import { prepend, uniqBy, prop, propEq, merge, __ } from 'ramda'
import { adjustBy } from 'ramda_ext'

export default function reducer(state = [], action) {
  switch (action.type) {
    case 'USERS.ADD':
      return uniqBy(prop('id'), prepend(action.user, state))
    case 'USERS.UPDATE':
      return adjustBy(merge(__, action.attrs), propEq('id', action.id), state)
    default:
      return state
  }
}
