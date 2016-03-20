import './activities_page.css'
import tmpl from './activities_page_tmpl.slim'

export default function register() {
  return this.component('activitiesPage', {
    template: tmpl,
    bindings: { page: '=' },
    controller: /* @ngInject */ function ($scope, activitiesService) {
      $scope.$watch(activitiesService.all, promise => promise.then(activities => this.activities = activities))

      this.page.currentPage = 'activities'
      this.remove = activitiesService.remove
      this.update = activitiesService.update
      this.create = activitiesService.create
    }
  })
}
