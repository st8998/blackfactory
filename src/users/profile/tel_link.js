import React from 'react'
import Stub from 'misc/stub'

import { reverse, compose, join, replace, reject, propOr } from 'ramda'
import { splitGroups } from 'ramda_ext'

export const format = compose(
  reverse(),
  join('-'),
  reject(part => !part || part === '+'),
  splitGroups([4, 3, 3, 101]),
  reverse(),
  replace(/[^\d\+]/g, ''),
  str => str || ''
)

const telNode = compose(tel => <a href={ `tel:${tel}` }>{ tel }</a>, format)

export default ({ tel }) => tel ? telNode(tel) : <Stub />
