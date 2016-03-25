import db from 'db'
import { prop, eqBy, differenceWith, intersectionWith } from 'ramda'

export const load = users => ({ type: 'USERS.LOAD', users })
export const loadCurrent = user => ({ type: 'USERS.LOAD_CURRENT', user })

export const requestAll = () => dispatch =>
  db.users.orderBy(':id').reverse().toArray()
    .then(users => dispatch(load(users)))

export const add = (user = { }, persist) => dispatch =>
  persist ? db.users.add(user)
    .then(function (id) {
      user.id = id
      dispatch(add(user))
    }) : Promise.resolve(dispatch({ type: 'USERS.ADD', user }))

export const remove = (user, persist) => dispatch =>
  persist ? db.users.delete(user.id).then(dispatch.bind(null, remove(user))) :
    Promise.resolve(dispatch({ type: 'USERS.REMOVE', user }))

export const update = (user, persist) => dispatch =>
  persist ? db.transaction('rw', db.users, () => db.users.put(user)).then(dispatch.bind(null, update(user))) :
    Promise.resolve(dispatch({ type: 'USERS.UPDATE', user }))

export const request = (id) => dispatch =>
  db.users.get(Number(id)).then(user => dispatch(add(user))).catch(::console.log)

export const requestCurrent = () => dispatch =>
  db.users.where('current').equals(1).first().then(user =>
    user === undefined ? dispatch(add({ current: 1 }, true)) : dispatch(load([user]))
  ).catch(::console.log)

export const persist = users => dispatch =>
  db.transaction('rw', db.users, () =>
    db.users.toArray().then(persisted => {
      differenceWith(eqBy(prop('id')), users, persisted).forEach(a => db.users.add(a))
      differenceWith(eqBy(prop('id')), persisted, users).forEach(a => db.users.delete(a.id))
      intersectionWith(eqBy(prop('id')), users, persisted).forEach(a => db.users.put(a))
    })
  ).catch(::console.log)

