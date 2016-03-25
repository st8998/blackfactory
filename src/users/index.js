import './users.css'
import registerUsersPage from './users_page'
import registerProfilePage from './profile_page'
import registerEditProfilePage from './edit_profile_page'
import registerPhoneFilter from './phone_filter'
import registerProfileScoreFilter from './profile_score_filter'

export default function registerActivities() {
  return this
    ::registerUsersPage()
    ::registerProfilePage()
    ::registerEditProfilePage()
    ::registerPhoneFilter()
    ::registerProfileScoreFilter()
}
