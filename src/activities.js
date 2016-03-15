export default function register() {
  return this.component('activities', /* @ngInject */ {
    template: '<h1>ACTIVITIES</h1>',
    bindings: { page: '=' },
    controller() {
      this.page.currentPage = 'activities'
    }
  })
}
