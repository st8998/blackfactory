import registerActivitiesPage from './activities_page'
import registerActivitiesService from './activities_service'

export default function registerActivities() {
  return this
    ::registerActivitiesPage()
    ::registerActivitiesService()
}