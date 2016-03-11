/* global angular */

import 'angular-mocks'
import 'angular'

import 'spec/misc/dates_spec'
import 'spec/calendar/calendar_spec'
import 'spec/dropdown/dropdown_spec'

import toHaveSameDay from 'matchers/to_have_same_day'
import toHaveClass from 'matchers/to_have_class'
import toHaveExtendedMonthDayNodes from 'matchers/to_have_extended_month_day_nodes'

import registerCalendar from 'calendar/calendar'
import registerDropdown from 'dropdown/dropdown'

import * as d from 'misc/dates'

beforeEach(function () {
  jasmine.addMatchers({ toHaveSameDay, toHaveClass, toHaveExtendedMonthDayNodes })
})

angular.module('app', [])
  ::registerCalendar()
  ::registerDropdown()
  .run(function ($filter) { d.format = $filter('date') })
  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })

beforeEach(angular.mock.module('app'))