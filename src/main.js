import 'jquery'
import angular from 'angular'

import 'main.css'

import { default as registerCalendar } from 'calendar/calendar'
import { default as registerDropdown } from 'dropdown/dropdown'

import * as dates from 'misc/dates'

angular.module('markup', [])
  ::registerCalendar()
  ::registerDropdown()
  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })
  .run(function ($filter) { dates.format = $filter('date') })
