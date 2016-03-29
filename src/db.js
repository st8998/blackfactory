import Dexie from 'dexie'

const db = new Dexie('db')

db.version(1).stores({
  activities: '++id, color, name, abbr'
})

db.version(2).stores({
  activities: '++id, color, name, abbr',
  users: '++id, *current, name, avatar, jobTitle, birthdate, hobby, phone, email, skype, skills, experience, socials',
})

db.open()

export default db

export function assertFound(model) {
  return model || Promise.reject('Not found')
}
