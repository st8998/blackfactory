import React from 'react'
import { merge } from 'ramda'
import Transition from 'react-addons-css-transition-group'

export default function (props) {
  const transitionProps = merge({
    transitionAppearTimeout: 0,
    transitionEnterTimeout: 0,
    transitionLeaveTimeout: 0
  }, props)

  return <Transition { ...transitionProps }>{ props.children }</Transition>
}
