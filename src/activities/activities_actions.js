import Dexie from 'dexie'

const db = new Dexie('db')
db.version(1).stores({ activities: '++id, color, name, abbr' })
 
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
  persist ? db.activities.delete(activity.id).then(dispatch(remove(activity))) : 
    Promise.resolve(dispatch({ type: 'ACTIVITIES.REMOVE', activity }))

export const update = (activity, persist) => dispatch =>
  persist ? db.transaction('rw', db.activities, () => db.activities.put(activity)) :
    Promise.resolve(dispatch({ type: 'ACTIVITIES.UPDATE', activity }))
