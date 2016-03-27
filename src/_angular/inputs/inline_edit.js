import './inline_edit.css'
import tmpl from './inline_edit_tmpl.slim'

import $ from 'jquery'
import { invert, map, compose, reject, equals } from 'ramda'

const angularAttrsToHtml = attrs =>
  compose(
    map(angularName => attrs[angularName]),
    invert,
    reject(equals('class')))(attrs.$attr)

export default function register() {
  return this.directive('inlineEdit', /* @ngInject */ function () {
    return {
      restrict: 'AE',

      compile(tEl, tAttrs) {
        // check if element form of directive is used
        if (!tAttrs.hasOwnProperty('inlineEdit')) {
          const tmplEl = $(tmpl)

          tmplEl.addClass(tAttrs.class)
          tmplEl.find('.inline-edit__input').attr(angularAttrsToHtml(tAttrs))

          tmplEl.find('.inline-edit__view')
            .attr('ng-bind', `${tAttrs.ngModel} || '${tAttrs.placeholder || ''}'`)

          tEl.replaceWith(tmplEl)
        }
      }
    }
  })
}
