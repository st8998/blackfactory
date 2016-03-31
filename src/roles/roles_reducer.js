import { concat, uniqBy, prop, propEq, merge, sortBy, reverse, reject, compose, __ } from 'ramda'
import { adjustBy } from 'ramda_ext'

const normalize = compose(reverse, sortBy(prop('id')), uniqBy(prop('id')))

export default function reducer(state = [], action) {
  switch (action.type) {
    case 'ROLES.ADD':
      return normalize(concat(state, action.role))
    case 'ROLES.UPDATE':
      return adjustBy(merge(__, action.attrs), propEq('id', action.id), state)
    case 'ROLES.REMOVE':
      return reject(propEq('id', action.id), state)
    default:
      return state
  }
}
