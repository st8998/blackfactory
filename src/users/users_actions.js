import db from 'db'
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
  delay(500).then(() => db.users.get(Number(id)).then(user => dispatch(add(user))).catch(::console.log))
