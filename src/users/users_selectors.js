import { createSelector } from 'reselect'
import { merge, indexBy, map, prop, propEq, find } from 'ramda'

export const usersWithRolesSelector = createSelector(
  [state => state.users, state => state.roles],
  (users, roles) => {
    const rolesDict = merge(indexBy(prop('id'), roles), { 0: { id: 0, name: 'Not Assigned', abbr: 'NA', color: 16 } })

    return { users: map(user => merge(user, { role: rolesDict[user.roleId || 0] }), users) }
  }
)

export const userSelector = createSelector(
  [state => state.users, (state, props) => Number(props.params.id)],
  ({ users }, id) => ({ user: find(propEq('id', id), users) })
)

export const userWithRoleSelector = createSelector(
  [usersWithRolesSelector, (state, props) => Number(props.params.id)],
  ({ users }, id) => ({ user: find(propEq('id', id), users) })
)
