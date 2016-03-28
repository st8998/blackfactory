import React from 'react'

import { reverse, compose, join, replace, reject, propOr } from 'ramda'
import { splitGroups } from 'ramda_ext'

export default compose(
  tel => <a href={ `tel:${tel}` }>{ tel }</a>,
  reverse(),
  join('-'),
  reject(part => !part || part === '+'),
  splitGroups([4, 3, 3, 101]),
  reverse(),
  replace(/[^\d\+]/g, ''),
  propOr('', 'tel')
)
