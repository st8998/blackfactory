import './profile_edit.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { find, propEq, merge, clone, pick } from 'ramda'

import { request as requestUser, update as updateUser } from 'users/users_actions'
import { userSelector } from 'users/users_selectors'

import Loader from 'common/loader'

import { Fieldset, createValue, WithFormValue } from 'react-forms'

import Input from 'misc/input'
import TextareaField from './textarea_field'
import TextField from './text_field'
import SelectRoleField from './select_role_field'
import ProfileEditAvatar from './profile_edit_avatar'
import ProfileEditSkills from './profile_edit_skills'
import ProfileEditExperiences from './profile_edit_experiences'


@connect(
  userSelector,
  { requestUser, updateUser }
)
export default class UserProfileEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  state = { };

  assertUser(id) {
    this.props.requestUser(id)
      .catch(() => this.context.router.replace('/notfound'))
  }

  createFormValue(user) {
    const formValue = createValue({ value: pick(['roleId', 'avatar', 'hobby', 'birthdate', 'skills', 'experience', 'name', 'jobTitle', 'phone', 'email', 'skype'], user), onChange: this.onChange.bind(this) })
    this.setState(merge(this.state, { formValue }))
  }

  componentWillMount() {
    if (this.props.user) {
      this.createFormValue(this.props.user)
    } else {
      this.assertUser(this.props.params.id)
    }
  }

  componentWillReceiveProps(props) {
    if (props.user) {
      this.createFormValue(props.user)
    } else {
      this.assertUser(props.params.id)
    }
  }

  onChange(formValue) {
    this.setState(merge(this.state, { formValue }))
  }

  handleUpdate() {
    this.setState(merge(this.state, { saving: true }))
    this.props.updateUser(this.props.user.id, this.state.formValue.value, true)
      .then(() => this.setState(merge(this.state, { saving: false })))
      .then(() => this.context.router.replace(`/profile/${this.props.user.id}`))
  }

  render() {
    const user = this.props.user
    const isSaving = this.state.saving

    if (!user) return <div className="centered-container"><Loader></Loader></div>

    return (
      <div className="centered-container" key={user.id}>
        <Fieldset formValue={this.state.formValue}>
          <ProfileEditAvatar select="avatar" className="edit-profile__avatar-pick" />

          <div className="profile-edit__form">
            <div className="profile__info-block">
              <dl>
                <TextField select="name" label="Your Name"></TextField>
                <TextField select="jobTitle" label="Job Title"></TextField>
                <SelectRoleField select="roleId" label="Role"></SelectRoleField>
              </dl>
            </div>

            <div className="profile__info-block">
              <h4>Contacts</h4>
              <dl>
                <TextField select="phone" label="Phone"></TextField>
                <TextField select="skype" label="Skype"></TextField>
                <TextField select="email" label="Email"></TextField>
              </dl>
            </div>

            <ProfileEditSkills select="skills" />

            <div className="profile__info-block">
              <h4>Info</h4>
              <dl>
                <TextField select="birthdate" label="Birth"></TextField>
                <TextareaField select="hobby" label="Hobby"></TextareaField>
              </dl>
            </div>

            <ProfileEditExperiences select="experience" />

            <span className={cn('button edit-profile__save', { 'button--loading': isSaving })} onClick={this.handleUpdate.bind(this)}>SAVE</span>
          </div>
        </Fieldset>
      </div>
    )
  }
}
