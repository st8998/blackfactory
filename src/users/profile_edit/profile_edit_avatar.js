import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import resizeImage from 'misc/resize_image'

import Avatar from 'common/avatar'

class ProfileEditAvatar extends Component {
  render() {
    return (
      <div className="profile-edit__avatar">
        <Avatar avatar={this.props.formValue.value} />
        <label className="button button--camera edit-profile__avatar-pick">
          <input type="file" onChange={this.handleImageUpload.bind(this)} />
        </label>
      </div>
    )
  }

  handleImageUpload(e) {
    const reader = new FileReader()

    reader.addEventListener('load', () => 
      this.props.formValue.update(resizeImage(reader.result, [135, 135]))
    )

    const file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)
    }
  }
}

ProfileEditAvatar = WithFormValue(ProfileEditAvatar)

export default ProfileEditAvatar
