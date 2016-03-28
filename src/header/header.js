import './header.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { find, propEq, assoc, compose, __ } from 'ramda'
import { createSelector } from 'reselect'

import { requestCurrent as requestCurrentUser } from 'users/users_actions'
import Transition from 'misc/transition'
import Loader from 'loader/loader'
import Avatar from 'avatar/avatar'

const currentUserSelector = createSelector(
  [state => state.users],
  compose(
    assoc('currentUser', __, {}),
    find(propEq('current', 1))
  )
)

export function Header({ user }) {
  const avatar = user ? (
    <Link to={ `/profile/${user.id}` }>
      <Transition transitionName="header__avatar" transitionAppear={true}>
        <Avatar model={ user } />
      </Transition>
    </Link>) : <Loader />

  return (
    <div className="header">
      <h1 className="header__logo">
        <Link to="/" title="Markup Project">Markup Project</Link>
      </h1>
      <ul className="header__menu">

      </ul>
      <div className="header__user">
        { avatar }
      </div>
    </div>
  )
}

@connect(
  currentUserSelector,
  { requestCurrentUser }
)
export default class CurrentUserHeader extends Component {
  componentDidMount() {
    this.props.requestCurrentUser()
  }

  render() {
    return <Header user={this.props.currentUser} />
  }
}
