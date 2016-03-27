import './users.css'
import registerProfilePage from './profile_page'
import registerEditProfilePage from './edit_profile_page'
import registerTeamPage from './team_page'
import registerPhoneFilter from './phone_filter'
import registerProfileScoreFilter from './profile_score_filter'

export default function registerActivities() {
  return this
    ::registerProfilePage()
    ::registerEditProfilePage()
    ::registerTeamPage()
    ::registerPhoneFilter()
    ::registerProfileScoreFilter()
}
