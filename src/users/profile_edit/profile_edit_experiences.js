import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import { map, append, reject, identical, addIndex } from 'ramda'

import Input from 'misc/input'

const mapIndexed = addIndex(map)

class ProfileEditExperience extends Component {
  render() {
    const experienceNodes = mapIndexed((experience, idx) => (
      <li className="profile-edit__info-item" key={idx}>
        <Input type="text" select={[idx, 'name']} className="input--text input--big profile-edit__experience-name" />
        <Input type="text" select={[idx, 'from']} className="input--text input--big profile-edit__experience-date" />
        <span> — </span>
        <Input type="text" select={[idx, 'to']} className="input--text input--big profile-edit__experience-date" />
        <span className="button button--remove" onClick={ this.removeExperience.bind(this, experience) } />
      </li>
    ))

    return (
      <div className="profile__info-block">
        <h4>Experience</h4>
        <div className="profile-edit__info-list-hint">Experience</div>
        <ul className="profile-edit__info-list">
          { experienceNodes(this.props.formValue.value || []) }

          <li className="profile-edit__info-item">
            <span className="button profile-edit__add-info-item" onClick={this.addExperience.bind(this)}>Add</span></li>
        </ul>
      </div>
    )
  }

  addExperience() {
    this.props.formValue.update(append({}, this.props.formValue.value || []))
  }

  removeExperience(experience) {
    this.props.formValue.update(reject(identical(experience), this.props.formValue.value))
  }
}

ProfileEditExperience = WithFormValue(ProfileEditExperience)

export default ProfileEditExperience
