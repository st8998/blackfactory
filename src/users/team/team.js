import 'users/users.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import { createSelector } from 'reselect'

import { pick, map, compose, sortBy, reduce, prop, times,
         reverse, addIndex, merge, propEq, filter, reject } from 'ramda'

import { requestAll as requestAllUsers } from 'users/users_actions'

import { format as formatPhone } from 'users/profile/tel_link'
import { Link } from 'react-router'
import HeaderControls from 'header/header_controls'
import Loader from 'loader/loader'
import Avatar from 'avatar/avatar'
import DonutChart from 'donut_chart/donut_chart'

import TeamUserActions from './team_user_actions'

const skillList = compose(
  arr => arr.length ? <ul className="team__skill-list">{ arr }</ul> : null,
  addIndex(map)((conf, idx) => {
    switch (conf.type) {
      case 'skill':
        return <li className="team__skill" key={idx}>
          <DonutChart value={conf.value.level} maxValue={5} />
          <span>{conf.value.name}</span>
        </li>
      case 'pl1':
        return <li className="team__skill team__skill--placeholder" key={idx}>
          <DonutChart />
          <span>Empty</span>
        </li>
      case 'more':
        return <li className="team__skill team__skill--more" key={idx}>
          <span>{`${conf.value} more skills`}</span>
        </li>
    }
  }),
  confs => confs.concat(times(() => ({ type: 'pl' }), (3 - (confs.length % 3)) % 3)),
  reduce((confs, skill) => {
    if (confs.length < 3) {
      return confs.concat({ type: 'skill', value: skill })
    } else if (confs.length === 3) {
      confs[2].type === 'skill' ? confs[2] = { type: 'more', value: 2 } : confs[2].value += 1
      return confs
    }
  }, []),
  reverse, sortBy(prop('level'))
)

const userRows = map(user => (
  <tr key={user.id}>
    <td />
    <td>
      <Link to={`/profile/${user.id}`}>
        <span className={cn({ 'team__admin-badge': user.admin })}><Avatar model={user} />{user.name}</span>
      </Link>
    </td>
    <td>{user.email}</td>
    <td>{formatPhone(user.phone)}</td>
    <td>{skillList(user.skills || [])}</td>
    <td><TeamUserActions user={user} /></td>
  </tr>
))

export const Team = function ({ users, loading }) {
  if (loading) return <div className="centered-container"><Loader /></div>

  return (
    <table className="team">
      <thead className="team-header">
      <tr>
        <th className="team-header__activity">Activity</th>
        <th className="team-header__name">Name</th>
        <th className="team-header__email">Email</th>
        <th className="team-header__phone">Phone</th>
        <th className="team-header__skills">Skills</th>
        <th className="team-header__controll" />
      </tr>
      </thead>
      <tbody>{ userRows(users) }</tbody>
    </table>
  )
}

const usersSelector = createSelector(
  [state => state.users],
  users => ({
    active: reject(propEq('archived', 1), users),
    archive: filter(propEq('archived', 1), users)
  })
)

@connect(
  usersSelector,
  { requestAllUsers }
)
export default class UsersTeam extends Component {
  state = { loading: false, filter: 'active' };

  componentWillMount() {
    this.setState(merge(this.state, { loading: true }))
    this.props.requestAllUsers()
      .catch(err => console.log(err, err.stack))
      .then(() => this.setState(merge(this.state, { loading: false })))
  }

  setFilter(filter) {
    this.setState(merge(this.state, { filter }))
  }

  render() {
    return (
      <div>
        <HeaderControls>
          <div className="team__filters">
            <span className={cn('team__filter', { 'team__filter--active': this.state.filter === 'active' })}
                  onClick={this.setFilter.bind(this, 'active')}>Active</span>
            <span className={cn('team__filter', { 'team__filter--active': this.state.filter === 'archive' })}
                  onClick={this.setFilter.bind(this, 'archive')}>
              {`Archive (${this.props.archive.length})`}
            </span>
          </div>
          <div className="button">Add random member</div>
        </HeaderControls>
        <Team users={this.props[this.state.filter]} loading={this.state.loading} />
      </div>
    )
  }
}
