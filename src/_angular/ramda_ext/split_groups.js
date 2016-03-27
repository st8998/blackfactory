import { curryN } from 'ramda'

export default curryN(2, function splitGroups(groups, list) {
  const result = []

  let n = 0
  let i = 0
  while (i < list.length) {
    result.push(list.slice(n, n += groups[i++]))
  }

  return result
})
