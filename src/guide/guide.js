import './guide.css'
import React from 'react'

import Dropdown from 'common/dropdown'

export default () => {
  return (
    <div className="centered-container">
      <span className="guide__inline-dropdown">
        <Dropdown actionButton={<span className="button button--gear">NO CORNER</span>}>
          <h1>Hello from dropdown</h1>
        </Dropdown>
      </span>
      <span className="guide__inline-dropdown">
        <Dropdown corner="right" actionButton={<span className="button button--gear button--borderless"></span>}>
          <h1>Hello from dropdown</h1>
        </Dropdown>
      </span>
      <span className="guide__inline-dropdown">
        <Dropdown corner="left" actionButton={<span className="button button--gear button--borderless"></span>}>
          <h1>Hello from dropdown</h1>
        </Dropdown>
      </span>
    </div>
  )
}
