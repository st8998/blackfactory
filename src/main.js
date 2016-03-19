import 'jquery'
import angular from 'angular'
import 'angular-route'

import 'main.css'

import registerDropdown from 'dropdown/dropdown'
import registerCalendar from 'calendar/calendar'
import registerRangeCalendar from 'range_calendar/range_calendar'
import registerFlippingCard from 'flipping_card/flipping_card'
import registerColorPicker from 'bg_colors/color_picker'

import registerInputs from 'inputs'

import registerHeaderComponent from 'header/header'
import registerHomeComponent from 'pages/home'
import registerActivitiesPage from 'pages/activities_page'
import registerGuidePage from 'pages/guide_page'

import * as dates from 'misc/dates'

angular.module('markup', ['ngRoute', 'ngAnimate'])
  ::registerDropdown()
  ::registerCalendar()
  ::registerRangeCalendar()
  ::registerFlippingCard()
  ::registerColorPicker()

  ::registerInputs()

  ::registerHeaderComponent()
  ::registerHomeComponent()
  ::registerActivitiesPage()
  ::registerGuidePage()


  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })

  .run(function ($filter) { dates.format = $filter('date') })

