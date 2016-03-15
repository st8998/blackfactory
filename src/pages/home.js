export default function register() {
  return this.component('home', /* @ngInject */ {
    template: '<h1>HOME</h1>',
    bindings: { page: '=' },
    controller() {
      this.page.currentPage = 'home'
    }
  })
}
