import './dropdown.css'
import React, { Component } from 'react'
import cn from 'classnames'
import listensToClickOutside from 'react-onclickoutside/decorator'

@listensToClickOutside()
export default class Dropdown extends Component {
  state = { opened: false };

  handleClickOutside(event) {
    this.setState({ opened: false })
  }

  toggle() {
    this.setState({ opened: !this.state.opened })
  }

  render() {
    if (this.state.opened) this.props.enableOnClickOutside()
    else this.props.disableOnClickOutside()

    const bodyClass = cn('dropdown__body dropdown__body--white', {
      'dropdown__body--corner-right': this.props.corner === 'right',
      'dropdown__body--corner-left': this.props.corner === 'left',
      'dropdown__body--open-right': this.props.corner === 'left',
      'dropdown__body--open-left': this.props.corner === 'right',
    })

    const body = this.state.opened ? <div className={bodyClass}>{this.props.children}</div> : null

    return (
      <div className="dropdown">
        <span className="dropdown__action-button" onClick={this::this.toggle}>{ this.props.actionButton }</span>
        { body }
      </div>
    )
  }
}
