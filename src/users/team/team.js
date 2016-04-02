import './team.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import { createSelector } from 'reselect'

import { pick, map, compose, sortBy, reduce, prop, times,
         reverse, addIndex, merge, propEq, filter, reject, toPairs, indexBy } from 'ramda'

import { requestAll as requestAllRoles } from 'roles/roles_actions'
import { requestAll as requestAllUsers, createRandom as createRandomUser } from 'users/users_actions'
import { setSort as sortTeam, setGroup as groupTeam } from './team_actions'
import { sortedGroupedTeamSelector } from './team_selectors'

import { Link } from 'react-router'

import { HeaderControls } from 'header'
import { format as formatPhone } from 'common/tel_link'
import Loader from 'common/loader'
import Avatar from 'common/avatar'
import DonutChart from 'common/donut_chart'

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

const userRows = addIndex(map)((user, idx) => (
  <tr key={user.id}>
    <td>
      {idx === 0 ? <span className={`team__role-badge bg-color--${user.role.color}`}>{user.role.abbr}</span> : null}
      <span className="team__role-name">{user.role.name}</span>
    </td>
    <td>
      <Link to={`/profile/${user.id}`}>
        <span className={cn({ 'team__admin-badge': user.admin })}><Avatar {...user} />{user.name}</span>
      </Link>
    </td>
    <td>{user.email}</td>
    <td>{formatPhone(user.phone)}</td>
    <td>{skillList(user.skills || [])}</td>
    <td><TeamUserActions user={user} /></td>
  </tr>
))

const roleGroups = compose(map(([roleId, users]) => (
  <tbody key={roleId || 0} className={cn({ 'team__users-group': roleId !== 'false' })}>
    {userRows(users)}
  </tbody>
)), toPairs)

export const Team = function ({ groups, loading, setSort, sort }) {
  if (loading) return <div className="centered-container"><Loader /></div>

  return (
    <table className="team">
      <thead className="team-header">
      <tr>
        <th className={cn('team-header__name team-header--sortable', {
                            'team-header--sorted-asc': !sort.reverse && sort.attr === 'role',
                            'team-header--sorted-desc': sort.reverse && sort.attr === 'role'
                          })}
            onClick={setSort.bind(null, 'role')}>Role</th>
        <th className={cn('team-header__name team-header--sortable', {
                            'team-header--sorted-asc': !sort.reverse && sort.attr === 'name',
                            'team-header--sorted-desc': sort.reverse && sort.attr === 'name'
                          })}
            onClick={setSort.bind(null, 'name')}>Name</th>
        <th className={cn('team-header__email team-header--sortable', {
                            'team-header--sorted-asc': !sort.reverse && sort.attr === 'email',
                            'team-header--sorted-desc': sort.reverse && sort.attr === 'email'
                          })}
            onClick={setSort.bind(null, 'email')}>Email</th>
        <th className="team-header__phone">Phone</th>
        <th className="team-header__skills">Skills</th>
        <th className="team-header__controll" />
      </tr>
      </thead>
      { roleGroups(groups) }
    </table>
  )
}

@connect(
  sortedGroupedTeamSelector,
  { requestAllUsers, createRandomUser, sortTeam, groupTeam, requestAllRoles }
)
export default class UsersTeam extends Component {
  state = { loading: false, filter: 'active', sort: 'id', reverse: false };

  componentWillMount() {
    this.setState({ loading: true })
    Promise.all([this.props.requestAllUsers(), this.props.requestAllRoles()])
      .catch(err => console.log(err, err.stack))
      .then(() => this.setState({ loading: false }))
  }

  setFilter(filter) {
    this.setState({ filter })
  }

  handleCreateRandomUser(e) {
    const node = e.target
    node.classList.add('button--loading')

    Promise.resolve(this.props.createRandomUser())
      .catch(err => console.log(err, err.stack))
      .then(() => node && node.classList.remove('button--loading'))
  }

  handleSort(attr) {
    this.props.sortTeam(attr)
  }

  render() {
    return (
      <div>
        <HeaderControls>
          <div className="team__filters">
            <label className={cn('team__filter', { 'team__filter--active': this.props.grouping.attr === 'role' })}>
              <input type="checkbox" checked={this.props.grouping.attr === 'role'} onClick={this.props.groupTeam.bind(null, 'role')} />
              Group by role
            </label>
            <span className={cn('team__filter', { 'team__filter--active': this.state.filter === 'active' })}
                  onClick={this.setFilter.bind(this, 'active')}>Active</span>
            <span className={cn('team__filter', { 'team__filter--active': this.state.filter === 'archive' })}
                  onClick={this.setFilter.bind(this, 'archive')}>
              {`Archive (${this.props.archiveCount})`}
            </span>
          </div>
          <div className="button" onClick={this::this.handleCreateRandomUser}>Add random member</div>
        </HeaderControls>
        <Team groups={this.props[this.state.filter]} loading={this.state.loading} sort={this.props.sort} setSort={this::this.handleSort} />
      </div>
    )
  }
}
