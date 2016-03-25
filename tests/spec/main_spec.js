/* global angular */

import 'angular-mocks'
import 'angular'

import 'spec/misc/dates_spec'
import 'spec/calendar/calendar_spec'
import 'spec/range_calendar/range_calendar_spec'
import 'spec/dropdown/dropdown_spec'
import 'spec/inputs/radiogroup_spec'
import 'spec/inputs/inline_edit_spec'
import 'spec/activities/activities_service_spec'
import 'spec/inputs/editable_list_spec'

import toHaveSameDay from 'matchers/to_have_same_day'
import toHaveClass from 'matchers/to_have_class'
import toHaveExtendedMonthDayNodes from 'matchers/to_have_extended_month_day_nodes'

import registerRangeCalendar from 'range_calendar/range_calendar'
import registerCalendar from 'calendar/calendar'
import registerDropdown from 'dropdown/dropdown'
import registerInputs from 'inputs'

import registerActivities from 'activities'

import * as d from 'misc/dates'

beforeEach(function () {
  jasmine.addMatchers({ toHaveSameDay, toHaveClass, toHaveExtendedMonthDayNodes })
})

angular.module('app', [])
  ::registerCalendar()
  ::registerRangeCalendar()
  ::registerDropdown()
  ::registerInputs()
  ::registerActivities()
  .run(function ($filter) { d.format = $filter('date') })
  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })

beforeEach(angular.mock.module('app'))
