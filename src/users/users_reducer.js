import { concat, uniqBy, prop, propEq, merge, sortBy, compose, __ } from 'ramda'
import { adjustBy } from 'ramda_ext'

const normalize = compose(sortBy(prop('id')), uniqBy(prop('id')))

export default function reducer(state = [], action) {
  switch (action.type) {
    case 'USERS.ADD':
      return normalize(concat(state, action.user))
    case 'USERS.UPDATE':
      return adjustBy(merge(__, action.attrs), propEq('id', action.id), state)
    default:
      return state
  }
}
