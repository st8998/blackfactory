import tmpl from './edit_profile_page_tmpl.slim'

import * as userActions from './users_actions'

import { find, propEq, clone } from 'ramda'

export default function register() {
  return this.directive('editProfilePage', /* @ngInject */ function ($routeParams, $location, Store, thumbnailService) {
    return {
      restrict: 'E',
      template: tmpl,
      link: function (scope, el, attrs) {
        scope.page.currentPage = 'profile'

        const findUser = find(propEq('id', Number($routeParams.userId)))
        
        Store.dispatch(userActions.request($routeParams.userId))
        Store.subscribe(function () {
          scope.user = clone(findUser(Store.getState().users.present))

          scope.user.skills = scope.user.skills || []
          scope.user.experience = scope.user.experience || []
        })

        scope.update = function () {
          Store.dispatch(userActions.update(scope.user, true)).then(function () {
            $location.path('/profile/' + scope.user.id)
          })
        }

        scope.removeFromCol = function (collection, item) {
          collection.splice(collection.indexOf(item), 1)
        }

        el.find('.edit-profile__avatar-pick input[type=file]').on('change', function () {
          const reader = new FileReader()

          reader.addEventListener('load', function () {
            scope.user.avatar = thumbnailService.resize(reader.result, [135, 135])
            scope.$digest()
          }, false)

          const file = document.querySelector('.edit-profile__avatar-pick input[type=file]').files[0]

          if (file) {
            reader.readAsDataURL(file)
          }
        })
      },
    }
  })
}
