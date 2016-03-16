import 'header/header.css'
import tmpl from 'header/header_tmpl.slim'

export default function initMenu() {
  return this.config(function ($routeProvider) {
    $routeProvider.when('/', { template: '<home page="page"></home>' })
    $routeProvider.when('/activities', { template: '<activities-page page="page"></activities-page>' })
    $routeProvider.when('/guide', { template: '<guide-page page="page"></guide-page>' })
    $routeProvider.otherwise({ redirectTo: '/' })
  })
  .run(function ($rootScope) {
    $rootScope.page = { }
  })
  .component('header', {
    template: tmpl,
    bindings: { page: '=' },
    controller() { }
  })
}
