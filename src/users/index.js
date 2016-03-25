import './users.css'
import registerUsersPage from './users_page'
import registerProfilePage from './profile_page'
import registerEditProfilePage from './edit_profile_page'

export default function registerActivities() {
  return this
    ::registerUsersPage()
    ::registerProfilePage()
    ::registerEditProfilePage()
}
