import { createSelector } from 'reselect'

import { assoc, __, filter, reject, propEq } from 'ramda'

export const projectsSelector = createSelector(
  [state => state.projects],
  assoc('projects', __, {})
)

export const activeArchivedProjectsSelector = createSelector(
  projectsSelector,
  ({ projects }) => ({
    active: reject(propEq('archived', 1), projects),
    archive: filter(propEq('archived', 1), projects)
  })
)
