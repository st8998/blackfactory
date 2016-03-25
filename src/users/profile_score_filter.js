import { reduce, mapObjIndexed, values } from 'ramda'

const WEIGHTS = {
  name: 25,
  jobTitle: 5,
  avatar: 30,
  phone: 10,
  skype: 5,
  email: 5,
  skills: 10,
  social: 10
}

const CHECKS = values(mapObjIndexed((check, key) => (user) => check(user) ? WEIGHTS[key] : 0)({
  name: user => user.email.indexOf(user.name) && user.name.length > 7,
  jobTitle: user => !!user.jobTitle,
  avatar: user => !!user.avatar,
  phone: user => !!(user.phone || '').match(/\d/),
  skype: user => !!user.skype,
  email: user => !!user.email,
  skills: user => user.skills && !!user.skills.length,
  social: user => user.socials && !!user.socials.length
}))

export default function register() {
  return this.filter('profileScore', /* @ngInject */ function () {
    return function (user) {
      if (!user) return 0

      return reduce((score, check) => score + check(user), 0, CHECKS)
    }
  })
}
