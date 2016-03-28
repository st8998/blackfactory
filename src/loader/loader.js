import './loader.css'
import React from 'react'
import Transition from 'misc/transition'

export default function () {
  return (
    <Transition transitionName="loader" transitionAppear={true}>
      <div className="loader"></div>
   </Transition>
  )
}
