import { createSelector } from 'reselect'
import { pick, merge, indexBy, map, reject, filter, propEq, prop } from 'ramda'

import { usersWithRolesSelector } from 'users/users_selectors'

export const sortedTeamSelector = createSelector(
  [usersWithRolesSelector, state => state.team.sorting],
  ({ users }, sorting) => {
    const sortedUsers = sorting.sorter(users)
    const archivedUsers = filter(propEq('archived', 1), sortedUsers)

    return {
      sort: pick(['attr', 'reverse'], sorting),
      active: reject(propEq('archived', 1), sortedUsers),
      archive: archivedUsers,
      archiveCount: archivedUsers.length
    }
  }
)

export const sortedGroupedTeamSelector = createSelector(
  [sortedTeamSelector, state => state.team.grouping],
  (state, grouping) => merge(state, {
    grouping: pick(['attr'], grouping),
    active: grouping.grouper(state.active),
    archive: grouping.grouper(state.archive)
  })
)
