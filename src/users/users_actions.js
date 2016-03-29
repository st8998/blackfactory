import db, { assertFound } from 'db'
import { } from 'ramda'
import delay from 'misc/delay'

export const add = (user = { }, persist) => dispatch =>
  persist ? db.users.add(user)
    .then(function (id) {
      user.id = id
      dispatch(add(user))
    }) : Promise.resolve(dispatch({ type: 'USERS.ADD', user }))

export const requestCurrent = () => dispatch =>
  delay(500).then(() => db.users.where('current').equals(1).first().then(user =>
    user === undefined ? dispatch(add({ current: 1 }, true)) : dispatch(add(user))
  ).catch(::console.log))

export const request = id => dispatch =>
  delay(500).then(() => db.users.get(Number(id)).then(assertFound).then(user => {
    return dispatch(add(user))
  }))

export const update = (id, attrs, persist) => dispatch =>
  persist ? delay(500).then(() => db.transaction('rw', db.users, () => db.users.update(id, attrs))
    .then(dispatch.bind(null, update(id, attrs)))) :
    Promise.resolve(dispatch({ type: 'USERS.UPDATE', id, attrs }))
