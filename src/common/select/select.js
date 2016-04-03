import './select.css'
import React, { Component } from 'react'
import randomatic from 'randomatic'
import { map, addIndex, merge } from 'ramda'

export const Option = ({ children, value, name, checked }) => (
  <label>
    <input className="select__radio" readOnly={true} checked={checked} type="radio" value={value} name={name} />
    <span className="select__option">{ children }</span>
  </label>
)

export class Select extends Component {
  render() {
    const name = randomatic(10)

    const { children } = this.props

    const options = addIndex(map)((option, idx) => {
      return <li className="select__option-container" key={idx}>{ option }</li>
    })

    return (
      <ul className="select" onChange={ this.props.onChange }>
        { options(children) }
      </ul>
    )
  }
}
