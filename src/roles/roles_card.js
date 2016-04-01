import './roles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decorate } from 'core-decorators'
import cn from 'classnames'
import randomatic from 'randomatic'

import { forEach, times } from 'ramda'

import { update as updateRole, remove as removeRole } from './roles_actions'

import withLoading from 'misc/with_loading'

@connect(
  null,
  { updateRole, removeRole }
)
export default class RolesCard extends Component {
  state = { flipped: false, loading: false };

  componentDidMount() {
    forEach(node =>
        node.addEventListener('click', () => this.setState({ flipped: !this.state.flipped })),
      this.refs.card.querySelectorAll('.flipping-card__flip-button')
    )
  }

  handleRemove(action) {
    return this.props.removeRole(this.props.role.id, true)
  }

  handlePickColor(e) {
    if (e.target.type === 'radio') {
      return this.props.updateRole(this.props.role.id, { color: Number(e.target.value) }, true)
    }
  }

  handleUpdate(e) {
    if (this.props.role[e.target.name] != e.target.value) {
      return this.props.updateRole(this.props.role.id, { [e.target.name]: e.target.value }, true)
    }
  }

  render() {
    const { role, pos } = this.props

    const radioname = randomatic(5)

    const colors = times(num => (
      <label key={num} className={`color-picker__color bg-color--${num}`}>
        <input type="radio" name={radioname} value={num} />
        <span className="color-picker__check-mark" />
      </label>
    ))

    return (
      <li ref="card" key={role.id}
          className={cn('role-tile-container flipping-card-container', { loading: this.state.loading })}
          style={{ transform: `translateX(${pos.x}px) translateY(${pos.y}px)` }}>
        <div className={cn('flipping-card', { 'flipping-card--flipped': this.state.flipped })}>
          <div className="role-tile flipping-card__front">
            <span className="button button--remove role-tile__remove-button"
                  onClick={this::this.handleRemove} />

            <div className={`role-tile__avatar bg-color--${role.color}`}>
              <span>{role.abbr}</span>
              <span className="button button--white button--small button--eyedropper flipping-card__flip-button" />
            </div>

            <label className="inline-edit role-tile__name">
              <input onBlur={this::this.handleUpdate}
                     defaultValue={role.name}
                     name="name" placeholder="Role name" type="text"
                     className="input--text inline-edit__input" />
              <span className="inline-edit__view">{role.name || 'Role name'}</span>
            </label>

            <label className="inline-edit role-tile__abbr">
              <input onBlur={this::this.handleUpdate}
                     defaultValue={role.abbr}
                     name="abbr" placeholder="Abbr" type="text"
                     className="input--text inline-edit__input" />
              <span className="inline-edit__input role-tile__abbr-hint">4 char max</span>
              <span className="inline-edit__view">{role.abbr || 'Abbr'}</span>
            </label>
          </div>
          <div className="role-tile flipping-card__back">
            <span className={`role-tile__badge bg-color--${role.color}`}>{role.abbr}</span>
            <div className="role-tile__color-picker">
              <ul className="color-picker" onClick={this::this.handlePickColor}>
                {colors(16)}
              </ul>
            </div>
            <span className="button button--small button--white flipping-card__flip-button">Back</span>
          </div>
        </div>
      </li>
    )
  }
}
