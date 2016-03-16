import tmpl from 'pages/guide_page_tmpl.slim'

export default function register() {
  return this.component('guidePage', /* @ngInject */ {
    template: tmpl,
    bindings: { page: '=' },
    controller() {
      this.page.currentPage = 'guide'
    }
  })
}
