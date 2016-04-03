import db, { assertFound } from 'db'

import delay from 'misc/delay'
import callOnce from 'misc/call_once'

export const add = (project = { }, persist) => dispatch =>
  persist ? delay(500).then(() => db.projects.add(project)
    .then(function (id) {
      project.id = id
      dispatch(add(project))
    })) : Promise.resolve(dispatch({ type: 'PROJECTS.ADD', project }))

export const requestAll = callOnce(
  () => dispatch =>
    delay(500).then(() => db.projects.toArray().then(projects => dispatch(add(projects)))),
  () => dispatch => Promise.resolve(null)
)

export const update = (id, attrs, persist) => dispatch =>
  persist ? delay(500).then(() => db.transaction('rw', db.projects, () => db.projects.update(id, attrs))
    .then(dispatch.bind(null, update(id, attrs)))) :
    Promise.resolve(dispatch({ type: 'PROJECTS.UPDATE', id, attrs }))

export const remove = (id, persist) => dispatch =>
  persist ? delay(500).then(() => db.projects.delete(id)
    .then(dispatch.bind(null, remove(id)))) :
    Promise.resolve(dispatch({ type: 'PROJECTS.REMOVE', id }))

