import React, { Component } from 'react'
import { WithFormValue } from 'react-forms'
import { connect } from 'react-redux'
import { decorate } from 'core-decorators'
import randomatic from 'randomatic'

import { map, pick, addIndex, indexBy, prop } from 'ramda'

import { requestAll as requestAllRoles } from 'roles/roles_actions'
import { rolesWithDefault } from 'roles/roles_selectors'


import Dropdown from 'common/dropdown'
import { Select, Option } from 'common/select'
import withLoading from 'misc/with_loading'

@connect(
  rolesWithDefault,
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
    const name = randomatic(10)

    const options = map(role => (
      <Option key={role.id} checked={role.id === this.props.formValue.value}
              name={name} value={role.id}>
        { `(${role.abbr}) ${role.name}` }
      </Option>
    ))
    const rolesDict = indexBy(prop('id'), this.props.roles)

    return (
      <div>
        <dt><label htmlFor={id}>{this.props.label}</label></dt>
        <dd>
          <Dropdown actionButton={ <input className="input--text input--big" disabled="disabled" value={rolesDict[this.props.formValue.value].name} /> }>
            <Select onChange={this::this.onChange}>
              { options(this.props.roles) }
            </Select>
          </Dropdown>
        </dd>
      </div>
    )
  }

  onChange(e) {
    this.props.formValue.update(Number(e.target.value))
  }
}

SelectRoleField = WithFormValue(SelectRoleField)

export default SelectRoleField
