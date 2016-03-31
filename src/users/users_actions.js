import db, { assertFound } from 'db'
import faker from 'faker'

import { times } from 'ramda'

import delay from 'misc/delay'
import callOnce from 'misc/call_once'

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
  delay(500).then(() => db.users.get(Number(id)).then(assertFound).then(user => dispatch(add(user))))

export const requestAll = callOnce(
  () => dispatch =>
    delay(500).then(() => db.users.toArray().then(users => dispatch(add(users)))),
  () => dispatch => Promise.resolve(null)
)

export const update = (id, attrs, persist) => dispatch =>
  persist ? delay(500).then(() => db.transaction('rw', db.users, () => db.users.update(id, attrs))
    .then(dispatch.bind(null, update(id, attrs)))) :
    Promise.resolve(dispatch({ type: 'USERS.UPDATE', id, attrs }))

export const remove = (id, persist) => dispatch =>
  persist ? delay(500).then(() => db.users.delete(id)
    .then(dispatch.bind(null, remove(id)))) :
    Promise.resolve(dispatch({ type: 'USERS.REMOVE', id }))

export const createRandom = () => add({
  name: faker.name.findName(),
  jobTitle: faker.name.jobTitle(),
  phone: faker.phone.phoneNumber('###########'),
  email: faker.internet.email(),
  birthdate: String(faker.date.past()),
  hobby: faker.lorem.sentence(),
  skills: times(
    () => ({ name: faker.name.jobArea(), level: faker.random.number({ min: 1, max: 5 }) }),
    faker.random.number({ min: 0, max: 5 })
  ),
  experience: [{ name: faker.company.companyName(),
                 from: faker.random.number({ min: 1995, max: 2016 }), to: 'Present' }]
}, true)
