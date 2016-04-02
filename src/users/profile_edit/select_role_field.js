import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import { connect } from 'react-redux'
import { decorate } from 'core-decorators'
import randomatic from 'randomatic'

import { map, pick, addIndex } from 'ramda'

import { requestAll as requestAllRoles } from 'roles/roles_actions'

import withLoading from 'misc/with_loading'

@connect(
  state => pick(['roles'], state),
  { requestAllRoles }
)
class SelectRoleField extends Component {
  state = { loading: false };

  @decorate(withLoading())
  componentWillMount() {
    return this.props.requestAllRoles()
  }

  render() {
    const id = randomatic(5)

    const options = map(role => <option value={role.id}>{ `(${role.abbr}) ${role.name}` }</option>)

    console.log('USER ROLE', this.props.formValue.value)
    
    return (
      <div>
        <dt><label htmlFor={id}>{this.props.label}</label></dt>
        <dd>
          <select id={id} value={this.props.formValue.value} disabled={this.state.loading} onChange={this.onChange.bind(this)}>
            <option value="">(NA) Not Assigned</option>
            { options(this.props.roles) }
          </select>
        </dd>
      </div>
    )
  }

  onChange(e) {
    console.log('SELECTED', Number(e.target.value) || null)
    this.props.formValue.update(Number(e.target.value) || null)
  }
}

SelectRoleField = WithFormValue(SelectRoleField)

export default SelectRoleField
