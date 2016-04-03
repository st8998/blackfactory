import { createSelector } from 'reselect'
import { prepend } from 'ramda'

export const rolesWithDefault = createSelector(
  [state => state.roles],
  roles => ({ roles: prepend({ id: 0, color: 16, name: 'Not Assigned', abbr: 'NA' }, roles) })
)
