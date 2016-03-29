import { prepend, uniqBy, prop } from 'ramda'

export default function reducer(state = [], action) {
  switch (action.type) {
    case 'USERS.ADD':
      console.log('ADD', action.user)
      return uniqBy(prop('id'), prepend(action.user, state))
    default:
      return state
  }
}
