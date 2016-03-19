/* global angular */

import tmpl from './radiogroup_spec_tmpl.slim'

describe('radiogroup', function () {
  let el
  let scope

  beforeEach(function () {
    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope.$new()
      el = $compile(tmpl)(scope)

      scope.arr = [1, 2]
      scope.obj = { a: 1 }
      scope.data = { x1: '1', x2: scope.arr, x3: 1 }

      scope.$digest()
    })
  })

  it('sets random name to all radio in group', function () {
    expect(el.find('.x1 [type="radio"]:eq(1)').attr('name')).not.toEqual(undefined)
  })

  it('checks radio according to ngModel value', function () {
    expect(el.find('.x1 [type="radio"]:eq(1)').is(':checked')).toBeTruthy()
    expect(el.find('.x2 [type="radio"]:eq(1)').is(':checked')).toBeTruthy()
    expect(el.find('.x3 [type="radio"]:eq(1)').is(':checked')).toBeTruthy()
  })

  it('sets ng-model value after check', function () {
    scope.data.x1 = 0
    scope.$digest()

    el.find('.x1 [type="radio"]:eq(2)').trigger('click')
    expect(scope.data.x1).toEqual('2')
  })

  it('integrates with ng-value', function () {
    scope.data.x2 = 0
    scope.$digest()

    el.find('.x2 [type="radio"]:eq(1)').trigger('click')
    expect(scope.data.x2).toEqual(scope.arr)

    el.find('.x2 [type="radio"]:eq(2)').trigger('click')
    expect(scope.data.x2).toEqual(scope.obj)

    el.find('.x3 [type="radio"]:eq(2)').trigger('click')
    expect(scope.data.x3).toEqual(2)
  })
})
