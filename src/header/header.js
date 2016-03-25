import 'header/header.css'
import tmpl from 'header/header_tmpl.slim'

export default function initMenu() {
  return this.config(/* @ngInject */ function ($routeProvider) {
    $routeProvider.when('/', { template: '<home page="page"></home>' })
    $routeProvider.when('/activities', { template: '<activities-page page="page"></activities-page>' })
    $routeProvider.when('/guide', { template: '<guide-page page="page"></guide-page>' })
    $routeProvider.when('/profile/:userId', { template: '<profile-page></profile-page>' })
    $routeProvider.when('/profile/:userId/edit', { template: '<edit-profile-page></edit-profile-page>' })
    $routeProvider.otherwise({ redirectTo: '/activities' })
  })
  .run(/* @ngInject */ function ($rootScope) {
    $rootScope.page = { }
  })
  .directive('header', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      link: function(scope, el, attrs) {
      },
    }
  })
}
