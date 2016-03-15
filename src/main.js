import 'jquery'
import angular from 'angular'
import 'angular-route'

import 'main.css'

import registerDropdown from 'dropdown/dropdown'
import registerCalendar from 'calendar/calendar'
import registerRangeCalendar from 'range_calendar/range_calendar'

import registerHeaderComponent from 'header/header'
import registerHomeComponent from 'home'
import registerActivitiesComponent from 'activities'

import * as dates from 'misc/dates'

angular.module('markup', ['ngRoute'])
  ::registerDropdown()
  ::registerCalendar()
  ::registerRangeCalendar()

  ::registerHeaderComponent()
  ::registerHomeComponent()
  ::registerActivitiesComponent()


  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })

  .run(function ($filter) { dates.format = $filter('date') })

