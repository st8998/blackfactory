import './roles.css'
import './color_picker.css'
import './inline_edit.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { decorate } from 'core-decorators'
import cn from 'classnames'

import { map, addIndex, forEach } from 'ramda'

import { requestAll as requestAllRoles, add as addRole, remove as removeRole } from './roles_actions'

import snakeFlow from './snake_flow'
import RolesCard from './roles_card'

import withLoading from 'misc/with_loading'
import Loader from 'loader/loader'

const { ceil } = Math

const rolesSelector = createSelector(
  [state => state.roles],
  roles => ({ roles })
)

@connect(
  rolesSelector,
  { requestAllRoles, addRole, removeRole }
)
export default class ConnectedRoles extends Component {
  state = { loading: false, loadingAdd: false };

  @decorate(withLoading())
  componentWillMount() {
    return this.props.requestAllRoles()
  }

  @decorate(withLoading('loadingAdd'))
  handleAdd() {
    return this.props.addRole({}, true)
  }

  render() {
    if (this.state.loading) return <div className="centered-container"><Loader /></div>

    const roles = this.props.roles

    const positions = snakeFlow(250, 4, roles)

    const roleNodes = map(role => <RolesCard key={role.id} role={role} pos={positions[role.id]} />)

    return (
      <div className="centered-container">
        <div className="section-header">
          <h3 className="section-header__title">Roles</h3>
        </div>

        <div className="section-body">
          <ul className="roles-tiles" style={{ height: ceil((roles.length + 1) / 4) * 250 }}>
            <li className={cn('role-tile-container', { loading: this.state.loadingAdd })}>
              <div className="role-tile role-tile--add-new"
                   onClick={this::this.handleAdd}>
                <span className="role-tile__add-new-hint">Create new Role</span>
              </div>
            </li>

            { roleNodes(roles) }
          </ul>
        </div>
      </div>
    )
  }
}
