import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import { map, append, reject, identical, addIndex } from 'ramda'
import cn from 'classnames'

import Input from 'misc/input'
import DonutChart from 'donut_chart/donut_chart'

const mapIndexed = addIndex(map)

class ProfileEditSkills extends Component {
  render() {
    const skillNodes = mapIndexed((skill, idx) => (
      <li className="profile-edit__info-item" key={idx}>
        <Input select={[idx, 'name']} type="text" className="input--text input--big profile-edit__skill-name" />
        <Input select={[idx, 'level']} type="number" max="5" min="0" className="input--text input--big profile-edit__skill-value" />
        <DonutChart maxValue={5} value={Number(skill.level)} />
        <span className="button button--remove" onClick={ this.removeSkill.bind(this, skill) }></span>
      </li>
    ))

    return (
      <div className="profile__info-block">
        <h4>Skills <span>as you'd rate them yourself</span></h4>
        <div className="profile-edit__info-list-hint">Your Skills</div>
        <ul className="profile-edit__info-list">
          { skillNodes(this.props.formValue.value || []) }
          
          <li className="profile-edit__info-item">
            <span className="button profile-edit__add-info-item" onClick={this.addSkill.bind(this)}>Add</span></li>
        </ul>
      </div>
    )
  }
  
  addSkill() {
    this.props.formValue.update(append({}, this.props.formValue.value || []))
  }

  removeSkill(skill) {
    this.props.formValue.update(reject(identical(skill), this.props.formValue.value))
  }
}

ProfileEditSkills = WithFormValue(ProfileEditSkills)

export default ProfileEditSkills
