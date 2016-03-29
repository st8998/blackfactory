import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import randomatic from 'randomatic'

class TextField extends Component {
  render() {
    const id = randomatic(5) 
    
    return (
      <div>
        <dt><label htmlFor={id}>{this.props.label}</label></dt>
        <dd><input id={id} value={this.props.formValue.value}
                   onChange={this.onChange.bind(this)} 
                   type="text" className="input--text input--big"/></dd>
      </div>
    )
  }

  onChange(e) {
    this.props.formValue.update(e.target.value)
  }
}

TextField = WithFormValue(TextField)

export default TextField
