import { reject, propEq, identity, prepend, assoc } from 'ramda'
import Dexie from 'dexie'

export default function register() {
  return this.service('activitiesService', /* @ngInject */ function ($q) {
    const db = new Dexie('db')
    db.version(1).stores({ activities: '++id, color, name, abbr' })

    let promise

    const api = {
      all: () => promise || (promise = $q.when(db.activities.orderBy(':id').reverse().toArray())),
      
      remove: activity => db.activities.delete(activity.id)
        .then(() => promise = api.all().then(reject(propEq('id', activity.id)))),

      update: function (activity) {
        db.transaction('rw', db.activities, function () {
          db.activities.put(activity)
            .then(() => promise = api.all().then(identity))
        }).catch(::console.log)
      },

      create: (attrs = {}) => db.activities.add(attrs)
        .then((id) => promise = api.all().then(prepend(assoc('id', id, attrs))))
    }

    return api
  })
}
