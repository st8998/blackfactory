import './dropdown.css'
import React, { Component } from 'react'

export default class Dropdown extends Component {
  state = { opened: false };
  
  toggle() {
    this.setState({ opened: !this.state.opened })
  }
  
  render() {
    const body = this.state.opened ? <div className="dropdown__body dropdown__body--white">{this.props.children}</div> : null
    
    return (
      <div className="dropdown">
        <span className="dropdown__action-buton" onClick={this::this.toggle}>{ this.props.actionButton }</span>
        { body }
      </div>
    )
  }
}
