import 'pages/activities_page.css'
import tmpl from 'pages/activities_page_tmpl.slim'

export default function register() {
  return this.component('activitiesPage', /* @ngInject */ {
    template: tmpl,
    bindings: { page: '=' },
    controller() {
      this.page.currentPage = 'activities'
    }
  })
}
