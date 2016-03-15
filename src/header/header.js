import 'header/header.css'
import tmpl from 'header/header_tmpl.slim'

export default function initMenu() {
  return this.config(function ($routeProvider) {
    $routeProvider.when('/', { template: '<home page="page"></home>' })
    $routeProvider.when('/activities', { template: '<activities page="page"></activities>' })
    $routeProvider.otherwise({ redirectTo: '/' })
  })
  .run(function ($rootScope) {
    $rootScope.page = { joppa: 'DRILLER' }
  })
  .component('header', {
    template: tmpl,
    bindings: { page: '=' },
    controller() { }
  })
}
