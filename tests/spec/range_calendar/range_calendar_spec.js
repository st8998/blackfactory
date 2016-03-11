/* global angular */

import * as d from 'misc/dates'

describe('range calendar', function () {
  const today = new Date('2016-03-11')

  // stub Date constructor without args with fixed today date
  beforeEach(function () {
    spyOn(d, 'today').and.returnValue(today)
  })

  let scope
  let el

  beforeEach(function () {
    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope.$new()
      el = $compile('<range-calendar ng-model="range">')(scope)
      scope.$digest()
    })
  })

  it('renders today month in the middle if no date selected', function () {
    expect(el.find('.calendar__month:eq(1) .calendar__month-name').text()).toEqual('Mar 2016')
    expect(el.find('.calendar__month:eq(1)')).toHaveExtendedMonthDayNodes(today)
  })

  it('renders selected range in the middle if start/end months are the same', function () {
    scope.range = { start: new Date('2016-05-12'), end: new Date('2016-05-22') }
    scope.$digest()

    expect(el.find('.calendar__month:eq(1) .calendar__month-name').text()).toEqual('May 2016')
    expect(el.find('.calendar__month:eq(1)')).toHaveExtendedMonthDayNodes('2016-05-01')
  })

  it('renders selected start in the left if range fits in the 3 month', function () {
    scope.range = { start: new Date('2016-05-12'), end: new Date('2016-06-22') }
    scope.$digest()
    expect(el.find('.calendar__month:eq(0) .calendar__month-name').text()).toEqual('May 2016')
    expect(el.find('.calendar__month:eq(0)')).toHaveExtendedMonthDayNodes('2016-05-01')

    scope.range = { start: new Date('2016-05-12'), end: new Date('2016-07-22') }
    scope.$digest()
    expect(el.find('.calendar__month:eq(0) .calendar__month-name').text()).toEqual('May 2016')
    expect(el.find('.calendar__month:eq(0)')).toHaveExtendedMonthDayNodes('2016-05-01')
  })

  it('renders selected end in the right if range doesnt fit in the 3 month', function () {
    scope.range = { start: new Date('2016-05-12'), end: new Date('2016-10-22') }
    scope.$digest()
    expect(el.find('.calendar__month:eq(2) .calendar__month-name').text()).toEqual('Oct 2016')
    expect(el.find('.calendar__month:eq(2)')).toHaveExtendedMonthDayNodes('2016-10-01')
  })

  it('shifts months right by 1 month after prev month button click', function () {
    expect(el.find('.calendar__month:eq(1)')).toHaveExtendedMonthDayNodes(today)

    el.find('.calendar__previous').click()
    expect(el.find('.calendar__month:eq(2)')).toHaveExtendedMonthDayNodes(today)
  })

  it('shifts months left by 1 month after next month button click', function () {
    expect(el.find('.calendar__month:eq(1)')).toHaveExtendedMonthDayNodes(today)

    el.find('.calendar__next').click()
    expect(el.find('.calendar__month:eq(0)')).toHaveExtendedMonthDayNodes(today)
  })
})
