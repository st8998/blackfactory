/* global angular */

import registerCalendar from 'calendar/calendar'

import * as d from 'misc/dates'

const today = new Date('2016-03-11')

angular.module('app', [])
  ::registerCalendar()
  .run(function ($filter) { d.format = $filter('date') })

let scope
let el

describe('calendar', function () {
  // stub Date constructor without args with fixed today date
  beforeEach(function () {
    spyOn(d, 'today').and.returnValue(today)
  })

  beforeEach(angular.mock.module('app'))

  beforeEach(function () {
    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope.$new()
      el = $compile('<calendar ng-model="date">')(scope)
    })
  })

  it('opens on today month', function () {
    expect(el.find('.calendar__month-name').text()).toEqual('Mar 2016')
    expect(el).toHaveExtendedMonthDayNodes(today)
  })

  it('sets other-day class for days from sibling months', function () {
    expect(el.find('.calendar__day').get(0)).toHaveClass('calendar__day--other-month')
    expect(el.find('.calendar__day').get(1)).not.toHaveClass('calendar__day--other-month')

    expect(el.find('.calendar__day').get(31)).not.toHaveClass('calendar__day--other-month')
    expect(el.find('.calendar__day').get(32)).toHaveClass('calendar__day--other-month')
    expect(el.find('.calendar__day').get(33)).toHaveClass('calendar__day--other-month')
    expect(el.find('.calendar__day').get(34)).toHaveClass('calendar__day--other-month')
  })

  it('marks today day', function () {
    expect(el.find('.calendar__day:contains(11)').get(0)).toHaveClass('calendar__day--today')
  })

  it('shows previous month after prev month button click', function () {
    el.find('.calendar__previous').click()
    expect(el.find('.calendar__month-name').text()).toEqual('Feb 2016')
    expect(el).toHaveExtendedMonthDayNodes(d.prevMonth(today))
  })

  it('shows next month after next month button click', function () {
    el.find('.calendar__next').click()
    expect(el.find('.calendar__month-name').text()).toEqual('Apr 2016')
    expect(el).toHaveExtendedMonthDayNodes(d.nextMonth(today))
  })

  it('set ng-model to selected day on click', function () {
    el.find('.calendar__day:contains(12)').click()
    expect(el.find('.calendar__day:contains(12)').get(0)).toHaveClass('calendar__day--selected')

    expect(scope.date).toHaveSameDay('2016-03-12')
  })

  it('marks day as selected after ng-model chages from outside', function () {
    scope.date = new Date('2016-03-19')
    scope.$digest()

    expect(el.find('.calendar__day:contains(19)').get(0)).toHaveClass('calendar__day--selected')
  })
})
