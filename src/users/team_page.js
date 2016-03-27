import tmpl from './team_page_tmpl.slim'
import * as userActions from 'users/users_actions'

export default function register() {
  return this.directive('teamPage', /* @ngInject */ function (Store) {
    return {
      restrict: 'E',
      template: tmpl,
      link: function (scope, el, attrs) {
        scope.page.currentPage = 'team'

        Store.dispatch(userActions.requestAll())

        Store.subscribe(function () {
          scope.users = Store.getState().users.present
        })

      },
    }
  })
}
