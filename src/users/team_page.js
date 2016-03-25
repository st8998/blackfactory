import tmpl from './team_page_tmpl.slim'

export default function register() {
  return this.directive('teamPage', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      link: function (scope, el, attrs) {
        scope.page.currentPage = 'team'
      },
    }
  })
}
