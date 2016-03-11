/* global angular */

import $ from 'jquery'

import dropdownInceptionTmpl from 'spec/dropdown/dropdown_spec_dropdown_inception_tmpl.slim'

describe('dropdown', function () {
  let el
  let scope

  beforeEach(function () {
    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope.$new()
      el = $compile(dropdownInceptionTmpl)(scope)
      scope.$digest()

      $('body').append(el)
    })
  })

  afterEach(function () {
    $('body *').remove()
  })

  it('detaches its body on link', function () {
    expect($('.dropdown__body').length).toEqual(0)
  })

  it('attachs dropdown body to document body on open', function () {
    el.find('.dropdown__action-button').trigger('click')
    expect($('body>.dropdown__body').length).toEqual(1)
  })

  it('opens as many included dropdowns as needed', function () {
    $('.dropdown__action-button.btn0').trigger('click')
    expect($('.dropdown__body').length).toEqual(1)

    $('.dropdown__action-button.btn1').trigger('click')
    expect($('.dropdown__body').length).toEqual(2)

    $('.dropdown__action-button.btn2').trigger('click')
    expect($('.dropdown__body').length).toEqual(3)

    $('.dropdown__action-button.btn3').trigger('click')
    expect($('.dropdown__body').length).toEqual(4)
  })

  it('closes on click outside', function () {
    $('.dropdown__action-button.btn0').trigger('click')
    expect($('.dropdown__body').length).toEqual(1)

    $('body').trigger('click')
    expect($('.dropdown__body').length).toEqual(0)
  })

  it('prevents parents close', function () {
    $('.dropdown__action-button.btn0').trigger('click')
    expect($('.dropdown__body').length).toEqual(1)

    $('.dropdown__action-button.btn1').trigger('click')
    expect($('.dropdown__body').length).toEqual(2)

    $('.dropdown__action-button.btn2').trigger('click')
    expect($('.dropdown__body').length).toEqual(3)

    $('.dropdown__action-button.btn3').trigger('click')
    expect($('.dropdown__body').length).toEqual(4)

    $('.body2').trigger('click')
    expect($('.dropdown__body').length).toEqual(3)

    $('.body1').trigger('click')
    expect($('.dropdown__body').length).toEqual(2)

    $('.body0').trigger('click')
    expect($('.dropdown__body').length).toEqual(1)
  })
})
