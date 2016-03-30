import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { update as updateUser } from 'users/users_actions'

const archiveUser = (id) => updateUser(id, { archived: 1 }, true)
const unArchiveUser = (id) => updateUser(id, { archived: 0 }, true)

@connect(
  null,
  { archiveUser, unArchiveUser }
)
export default class TeamUserActions extends Component {
  state = { loading: false };

  handleAction(id) {
    const action = this.props.user.archived ? this.props.unArchiveUser : this.props.archiveUser
    
    this.setState({ loading: true })
    action(id).catch().then(() => this.setState({ loading: false }))
  }
  
  render() {
    const action = this.props.user.archived ? this.props.unArchiveUser : this.props.archiveUser

    return <span className={cn('button button--gear button--borderless team__user-actions',
                               { 'button--loading': this.state.loading })}
                 onClick={this.handleAction.bind(this, this.props.user.id)} />
  }
}
