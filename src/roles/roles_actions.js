import db, { assertFound } from 'db'

import delay from 'misc/delay'
import callOnce from 'misc/call_once'

export const add = (role = { }, persist) => dispatch =>
  persist ? delay(0).then(() => db.roles.add(role)
    .then(function (id) {
      role.id = id
      dispatch(add(role))
    })) : Promise.resolve(dispatch({ type: 'ROLES.ADD', role }))

export const requestAll = callOnce(
  () => dispatch =>
    delay(0).then(() => db.roles.toArray().then(roles => dispatch(add(roles)))),
  () => dispatch => Promise.resolve(null)
)

export const update = (id, attrs, persist) => dispatch =>
  persist ? delay(0).then(() => db.transaction('rw', db.roles, () => db.roles.update(id, attrs))
    .then(dispatch.bind(null, update(id, attrs)))) :
    Promise.resolve(dispatch({ type: 'ROLES.UPDATE', id, attrs }))

export const remove = (id, persist) => dispatch =>
  persist ? delay(0).then(() => db.roles.delete(id)
    .then(dispatch.bind(null, remove(id)))) :
    Promise.resolve(dispatch({ type: 'ROLES.REMOVE', id }))
