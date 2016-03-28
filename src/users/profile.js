import './users.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { find, propEq, map, times } from 'ramda'

import { request as requestUser } from './users_actions'

import { Link } from 'react-router'
import DonutChart from 'donut_chart/donut_chart'
import Loader from 'loader/loader'
import Avatar from 'avatar/avatar'
import ProfileCompleted from './profile_completed'
import TelLink from './tel_link'
import SkypeLink from './skype_link'
import MailtoLink from './mailto_link'

const Info = function ({ birthday, hobby }) {
  const infoNodes = []
  if (birthday) infoNodes.push([<dt>date of birth</dt>, <dd>{birthday}</dd>])
  if (hobby) infoNodes.push([<dt>Hobby</dt>, <dd>{hobby}</dd>])

  return (
    <div className="profile__info-block">
      <h4>Info</h4>
      <dl className="profile__info-list">{infoNodes}</dl>
    </div>
  )
}

const Experience = function ({ experience }) {
  if (!experience) return <span></span>

  const experienceNodes = map(exp => [<dt>{`${exp.from} — ${exp.to}`}</dt>, <dd>{exp.name}</dd>])

  return (
    <div className="profile__info-block">
      <h4>Experience</h4>
      <dl className="profile__info-list">{experienceNodes(experience)}</dl>
    </div>
  )
}

const Skills = function ({ skills }) {
  if (!skills) return <span></span>

  const extendedSkills = skills.concat(times(() => ({}), (4 - (skills.length % 4)) % 4))

  const skillNodes = map(skill =>
    <li className={ cn('profile__skill', { 'profile__skill--placeholder': !skill.level }) }>
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

const Profile = function ({ user }) {
  if (!user) return <div className="centered-container"><Loader></Loader></div>

  return (
    <div className="centered-container">
      <div className="profile__avatar"><Avatar model={user} /></div>
      <div className="profile__info">
        <div className="profile__info-header">
          <h3 className="profile__user-name">
            { user.name }<span className="profile__user-job-title">{user.jobTitle}</span>
          </h3>
          <Link to={`/profile/${user.id}/edit`} className="button button--small profile__button-edit">
            Edit Profile
          </Link>
        </div>
        <ul className="profile__contact-info">
          <li className="profile__contact profile__contact--phone"><TelLink tel={user.phone}/></li>
          <li className="profile__contact profile__contact--skype"><SkypeLink skypeName={user.skype}/></li>
          <li className="profile__contact profile__contact--email"><MailtoLink address={user.email}/></li>
        </ul>
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
  componentDidMount() {
    if (!this.props.user) this.props.requestUser(this.props.params.id)
  }

  render() {
    return <Profile user={this.props.user}></Profile>
  }
}
