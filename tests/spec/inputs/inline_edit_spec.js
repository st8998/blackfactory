/* global angular */

import tmpl from './inline_edit_spec_tmpl.slim'

describe('inlineEdit', function () {
  let el
  let scope

  beforeEach(function () {
    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope.$new()
      el = $compile(tmpl)(scope)

      scope.data = { x1: '1', x2: 2, x3: '3' }

      scope.$digest()
    })
  })

  xit('hides input by default', function () {
    // I don't have any idea how to test 'position: absolute, left: -1000em'
  })

  it('uses default template if used as element', function () {
    expect(el.find('.x1 .inline-edit__input').length).toEqual(1)
    expect(el.find('.x2 .inline-edit__input').length).toEqual(1)
  })

  it('uses existed markup in used as attribute', function () {
    expect(el.find('.x3 .custom-input').length).toEqual(1)
  })

  it('copies all attributes to input filed is used as element', function () {
    const $x2input = el.find('.x2 .inline-edit__input')

    expect($x2input.attr('placeholder')).toEqual('x2')
    expect($x2input.attr('type')).toEqual('number')
    expect($x2input.attr('ng-change')).toEqual('noop()')
    expect($x2input.attr('ng-model')).toEqual('data.x2')
  })
})
