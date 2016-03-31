import { compose, reverse, sortBy, prop, identity as noop, merge } from 'ramda'

const defautSorting = { attr: 'id', reverse: false, sorter: noop }

export default function reducer(state = { sorting: defautSorting }, action) {
  switch (action.type) {
    case 'TEAM.SET_SORT':
      const isReverse = state.sorting.attr === action.attr ? !state.sorting.reverse : false

      return merge(state, { sorting: {
        attr: action.attr,
        reverse: isReverse,
        sorter: compose(isReverse ? reverse : noop, sortBy(prop(action.attr)))
      } })
    default:
      return state
  }
}
