import tmpl from './profile_page_tmpl.slim'

import * as userActions from './users_actions'

import { find, propEq } from 'ramda'

export default function register() {
  return this.directive('profilePage', /* @ngInject */ function ($routeParams, Store) {
    return {
      restrict: 'E',
      template: tmpl,
      link: function (scope, el, attrs) {
        scope.page.currentPage = 'profile'

        const findUser = find(propEq('id', Number($routeParams.userId)))
        
        Store.dispatch(userActions.request($routeParams.userId))
        Store.subscribe(function () {
          scope.user = findUser(Store.getState().users.present)

          scope.user.skills = scope.user.skills || []
          scope.user.skills = scope.user.skills.concat(Array.apply(null, { length: (4 - scope.user.skills.length % 4) % 4 }))
        })
      },
    }
  })
}
