import Dexie from 'dexie'
import * as activitiesActions from 'activities/activities_actions'

const db = new Dexie('db')
db.version(1).stores({ activities: '++id, color, name, abbr' })

function collectionToModel(collectionName) {
  switch (collectionName) {
    case 'activities':
      return 'activity'
    default:
      return collectionName
  }
}

export const dbMiddleware = store => next => action => {
  if (action.persist) {
    const storeName = action.type.match(/^(\w+?)\./)[1].toLowerCase()
    const modelName = collectionToModel(storeName)
    const method = action.type.match(/^\w+?\.(\w+)$/)[1]

    switch (method) {
      case 'ADD':
        return next((dispatch) =>
          db[storeName].add(action[modelName])
            .then(function (id) {
              action[modelName].id = id
              action.persist = false
              dispatch(action)
            }))
      case 'REMOVE':
        db[storeName].delete(action[modelName].id)
        return next(action)
      case 'UPDATE':
        db.transaction('rw', db[storeName], function () {
          db[storeName].put(action[modelName])
        })
        return next(action)
      default:
        return next(action)
    }
  } else {
    return next(action)
  }
}

export function loadActivities(store) {
  db.activities.orderBy(':id').reverse().toArray()
    .then(activities => store.dispatch(activitiesActions.load(activities)))
}
