import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import randomatic from 'randomatic'

class TextareaField extends Component {
  render() {
    const id = randomatic(5) 
    
    return (
      <div>
        <dt><label htmlFor={id}>{this.props.label}</label></dt>
        <dd><textarea id={id} value={this.props.formValue.value}
                      onChange={this.onChange.bind(this)}
                      rows="4" type="text" className="input--text input--big"/></dd>
      </div>
    )
  }

  onChange(e) {
    this.props.formValue.update(e.target.value)
  }
}

TextareaField = WithFormValue(TextareaField)

export default TextareaField
