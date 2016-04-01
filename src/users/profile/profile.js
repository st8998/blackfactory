import './profile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { find, propEq, map, times, addIndex } from 'ramda'

import { request as requestUser } from 'users/users_actions'

import { Link } from 'react-router'
import DonutChart from 'common/donut_chart'
import Stub from 'common/stub'
import Loader from 'common/loader'
import Avatar from 'common/avatar'
import TelLink from 'common/tel_link'
import SkypeLink from 'common/skype_link'
import MailtoLink from 'common/mailto_link'

import ProfileCompleted from './profile_completed'

const Info = function ({ birthdate, hobby }) {
  if (!birthdate && !hobby) return <Stub />

  const infoNodes = []
  if (birthdate) infoNodes.push([<dt>Date of birth</dt>, <dd>{birthdate}</dd>])
  if (hobby) infoNodes.push([<dt>Hobby</dt>, <dd>{hobby}</dd>])

  return (
    <div className="profile__info-block">
      <h4>Info</h4>
      <dl className="profile__info-list">{infoNodes}</dl>
    </div>
  )
}

const Experience = function ({ experience }) {
  if (!experience) return <Stub />

  const experienceNodes = map(exp => [<dt>{`${exp.from} — ${exp.to}`}</dt>, <dd>{exp.name}</dd>])

  return (
    <div className="profile__info-block">
      <h4>Experience</h4>
      <dl className="profile__info-list">{experienceNodes(experience)}</dl>
    </div>
  )
}

const Skills = function ({ skills }) {
  if (!skills || !skills.length) return <Stub />

  const extendedSkills = skills.concat(times(() => ({}), (4 - (skills.length % 4)) % 4))

  const skillNodes = addIndex(map)((skill, idx) =>
    <li className={ cn('profile__skill', { 'profile__skill--placeholder': !skill.level }) } key={idx}>
      <DonutChart maxValue={5} value={skill.level}/>
      <span>{skill.name || 'Empty'}</span>
    </li>
  )

  return (
    <div className="profile__info-block">
      <h4>Skills</h4>
      <ul className="profile__skill-list">{skillNodes(extendedSkills)}</ul>
    </div>
  )
}

const Contacts = function ({ phone, skype, email }) {
  if (!phone && !skype && !email) return <Stub />

  return (
    <ul className="profile__contact-info">
      <li className="profile__contact profile__contact--phone"><TelLink tel={phone}/></li>
      <li className="profile__contact profile__contact--skype"><SkypeLink skypeName={skype}/></li>
      <li className="profile__contact profile__contact--email"><MailtoLink address={email}/></li>
    </ul>
  )
}

const Profile = function ({ user }) {
  if (!user) return <div className="centered-container"><Loader></Loader></div>

  return (
    <div className="centered-container">
      <div className="profile__avatar"><Avatar {...user} /></div>
      <div className="profile__info">
        <div className="profile__info-header">
          <h3 className="profile__user-name">
            { user.name }<span className="profile__user-job-title">{user.jobTitle}</span>
          </h3>
          <Link to={`/profile/${user.id}/edit`} className="button button--small profile__button-edit">Edit Profile</Link>
        </div>
        <Contacts {...user} />
        <Skills skills={user.skills} />
        <Info {...user} />
        <Experience experience={user.experience} />
      </div>
      <ul className="profile__stats">
        <li className="profile__stat">
          <strong>0 <span>h</span></strong><span>On this week</span>
        </li>
        <li className="profile__stat">
          <strong>0 <span>h</span></strong><span>On this week</span>
        </li>
      </ul>
      <ProfileCompleted user={ user } />
    </div>
  )
}

@connect(
  (state, props) => ({ user: find(propEq('id', Number(props.params.id)), state.users) }),
  { requestUser }
)
export default class UserProfile extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  assertUser(id) {
    this.props.requestUser(id)
      .catch(() => this.context.router.replace('/notfound'))
  }

  componentWillMount() {
    if (!this.props.user) this.assertUser(this.props.params.id)
  }

  componentWillReceiveProps(props) {
    if (!props.user) this.assertUser(props.params.id)
  }

  render() {
    return <Profile user={this.props.user}></Profile>
  }
}
