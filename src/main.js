import 'jquery'
import angular from 'angular'

import 'main.css'

import { default as registerDropdown } from 'dropdown/dropdown'
import { default as registerCalendar } from 'calendar/calendar'
import { default as registerRangeCalendar } from 'range_calendar/range_calendar'

import * as dates from 'misc/dates'

angular.module('markup', [])
  ::registerDropdown()
  ::registerCalendar()
  ::registerRangeCalendar()
  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })
  .run(function ($filter) { dates.format = $filter('date') })
