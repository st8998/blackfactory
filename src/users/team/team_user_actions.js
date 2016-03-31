import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { map } from 'ramda'

import Loader from 'loader/loader'
import Dropdown from 'dropdown/dropdown'

import { update as updateUser } from 'users/users_actions'

const archiveUser = (id) => updateUser(id, { archived: 1 }, true)
const unArchiveUser = (id) => updateUser(id, { archived: 0 }, true)

@connect(
  null,
  { archiveUser, unArchiveUser }
)
export default class TeamUserActions extends Component {
  state = { loading: false };

  handleAction(action) {
    this.setState({ loading: true })
    action().catch().then(() => this.setState({ loading: false }))
  }

  render() {
    const { user, archiveUser, unArchiveUser } = this.props
    const actionButton = <span className={cn('button button--gear button--borderless team__user-actions',
                               { 'button--loading': this.state.loading })} />

    const userActions = []
    if (user.archived) {
      userActions.push(['UnArchive', unArchiveUser.bind(this, user.id)])
    } else {
      userActions.push(['Archive', archiveUser.bind(this, user.id)])
    }

    const actionNodes = map(([title, action]) =>
      <li className="team__user-action"
          onClick={this.handleAction.bind(this, action)}>{title}</li>)

    return this.state.loading ? <Loader /> :
      <Dropdown actionButton={actionButton}>
        <ul className="team__user-action-list">
          { actionNodes(userActions) }
        </ul>
      </Dropdown>
  }
}
