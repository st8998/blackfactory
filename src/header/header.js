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

const getRouter = state => state.router

const headerSelector = createSelector(
  [currentUserSelector, getRouter],
  (currentUser, router) => currentUser
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
        <Link to="/" activeClassName="active" title="Markup Project">Markup Project</Link>
      </h1>
      <ul className="header__menu">
        <li className="header__menu-item"><Link to="/roles" activeClassName="active">Roles</Link></li>
        <li className="header__menu-item"><Link to="/team" activeClassName="active">Team</Link></li>
      </ul>
      <div className="header__user">
        { avatar }
      </div>
    </div>
  )
}

@connect(
  headerSelector,
  { requestCurrentUser }
)
export default class CurrentUserHeader extends Component {
  componentDidMount() {
    if (!this.props.currentUser) this.props.requestCurrentUser()
  }

  render() {
    return <Header user={this.props.currentUser} />
  }
}
