import db from 'db'
import { prop, eqBy, differenceWith, intersectionWith } from 'ramda'

export const load = activities => ({ type: 'ACTIVITIES.LOAD', activities })

export const request = () => dispatch =>
  db.activities.orderBy(':id').reverse().toArray()
    .then(activities => dispatch(load(activities)))

export const add = (activity = { }, persist) => dispatch =>
  persist ? db.activities.add(activity)
    .then(function (id) {
      activity.id = id
      dispatch(add(activity))
    }) : Promise.resolve(dispatch({ type: 'ACTIVITIES.ADD', activity }))
    
export const remove = (activity, persist) => dispatch =>
  persist ? db.activities.delete(activity.id).then(dispatch.bind(null, remove(activity))) : 
    Promise.resolve(dispatch({ type: 'ACTIVITIES.REMOVE', activity }))

export const update = (activity, persist) => dispatch =>
  persist ? db.transaction('rw', db.activities, () => db.activities.put(activity)).then(dispatch.bind(null, update(activity))) :
    Promise.resolve(dispatch({ type: 'ACTIVITIES.UPDATE', activity }))

export const persist = activities => dispatch =>
  db.transaction('rw', db.activities, () =>
    db.activities.toArray().then(persisted => {
      differenceWith(eqBy(prop('id')), activities, persisted).forEach(a => db.activities.add(a))
      differenceWith(eqBy(prop('id')), persisted, activities).forEach(a => db.activities.delete(a.id))
      intersectionWith(eqBy(prop('id')), activities, persisted).forEach(a => db.activities.put(a))
    })
  ).catch(::console.log)
