import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'

class Input extends Component {
  render() {
    return <input value={this.props.formValue.value}
                  onChange={this.onChange.bind(this)}
      {...this.props} />
  }

  onChange(e) {
    this.props.formValue.update(this.props.type === 'number' ? Number(e.target.value) : e.target.value)
  }
}
Input = WithFormValue(Input)

export default Input
