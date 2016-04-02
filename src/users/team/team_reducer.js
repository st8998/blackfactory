import { compose, reverse, sortBy, prop, propOr, identity as noop, merge, groupBy, always, path } from 'ramda'

const defautSorting = { attr: 'id', reverse: false, sorter: noop }
const defautGrouping = { grouper: groupBy(always(false)) }

export default function reducer(state = { sorting: defautSorting, grouping: defautGrouping }, action) {
  switch (action.type) {
    case 'TEAM.SET_SORT': {
      const isReverse = state.sorting.attr === action.attr ? !state.sorting.reverse : false
      const baseSorter = action.attr === 'role' ? sortBy(path(['role', 'name'])) : sortBy(prop(action.attr))
      const sorter = isReverse ? compose(reverse, baseSorter) : baseSorter

      return merge(state, { sorting: {
        attr: action.attr,
        reverse: isReverse,
        sorter
      } })
    }
    case 'TEAM.SET_GROUP': {
      const groupAttr = state.grouping.attr === action.attr ? null : action.attr

      return merge(state, { grouping: {
        attr: groupAttr,
        grouper: groupAttr ? groupBy(user => user.role && user.role.id || 0) : groupBy(always(false)),
      } })
    }
    default:
      return state
  }
}
