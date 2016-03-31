import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { map, addIndex } from 'ramda'

import Loader from 'loader/loader'
import Dropdown from 'dropdown/dropdown'

import { update as updateUser } from 'users/users_actions'

@connect(
  null,
  { archiveUser: (id) => updateUser(id, { archived: 1 }, true),
    unArchiveUser: (id) => updateUser(id, { archived: 0 }, true),
    promoteAdmin: (id) => updateUser(id, { admin: 1 }, true),
    unPromoteAdmin: (id) => updateUser(id, { admin: 0 }, true)
  }
)
export default class TeamUserActions extends Component {
  state = { loading: false };

  handleAction(action) {
    this.setState({ loading: true })
    action().catch().then(() => this.setState({ loading: false }))
  }

  render() {
    const { user, archiveUser, unArchiveUser, promoteAdmin, unPromoteAdmin } = this.props
    const actionButton = <span className={cn('button button--gear button--borderless team__user-actions',
                               { 'button--loading': this.state.loading })} />

    const userActions = []
    if (user.archived) {
      userActions.push(['UnArchive', unArchiveUser.bind(this, user.id)])
    } else {
      userActions.push(['Archive', archiveUser.bind(this, user.id)])
      if (user.admin) {
        userActions.push(['Revoke Admin Rights', unPromoteAdmin.bind(this, user.id)])
      } else {
        userActions.push(['Promote to Admin', promoteAdmin.bind(this, user.id)])
      }
    }

    const actionNodes = addIndex(map)(([title, action], idx) =>
      <li key={idx} className="team__user-action"
          onClick={this.handleAction.bind(this, action)}>{title}</li>)

    return this.state.loading ? <Loader /> :
      <Dropdown actionButton={actionButton}>
        <ul className="team__user-action-list">
          { actionNodes(userActions) }
        </ul>
      </Dropdown>
  }
}
