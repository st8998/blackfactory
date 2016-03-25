export default function register() {
  return this.directive('usersPage', /* @ngInject */ function () {
    return {
      restrict: 'E',
      link: function(scope, el, attrs) {

      },
    }
  })
}
