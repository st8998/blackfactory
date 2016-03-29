import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'

class Textarea extends Component {
  render() {
    return <textarea value={this.props.formValue.value}
                     onChange={this.onChange.bind(this)}
                     {...this.props} />
  }

  onChange(e) {
    this.props.formValue.update(e.target.value)
  }
}
Textarea = WithFormValue(Textarea)

export default Textarea
