import { reverse, compose, join, replace, reject } from 'ramda'
import { splitGroups } from 'ramda_ext'

export default function register() {
  return this.filter('phone', /* @ngInject */ function () {
    const format = compose(
      reverse(),
      join('-'),
      reject(part => !part || part === '+'),
      splitGroups([4, 3, 3, 101]),
      reverse(),
      replace(/[^\d\+]/g, '')
    )

    return function (str) {
      if (!str) return str

      return format(str)
    }
  })
}
