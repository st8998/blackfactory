import 'jquery'
import angular from 'angular'
import 'angular-route'

import 'main.css'

import registerDropdown from 'dropdown/dropdown'
import registerCalendar from 'calendar/calendar'
import registerRangeCalendar from 'range_calendar/range_calendar'
import registerFlippingCard from 'flipping_card/flipping_card'
import registerColorPicker from 'bg_colors/color_picker'
import registerPreventInitialAnimation from 'misc/prevent_initial_animation'

import registerInputs from 'inputs'
import registerLoader from 'loader/loader'

import registerHeaderComponent from 'header/header'
import registerHomeComponent from 'pages/home'
import registerGuidePage from 'pages/guide_page'

import registerActivities from 'activities'

import reduxStore from 'redux_store'

import * as dates from 'misc/dates'

angular.module('markup', ['ngRoute', 'ngAnimate'])
  ::registerDropdown()
  ::registerCalendar()
  ::registerRangeCalendar()
  ::registerFlippingCard()
  ::registerColorPicker()
  ::registerPreventInitialAnimation()

  ::registerInputs()
  ::registerLoader()

  ::registerActivities()
  
  ::registerHeaderComponent()
  ::registerHomeComponent()
  ::registerGuidePage()

  .constant('Store', reduxStore)
  .run(/* @ngInject */ function ($rootScope, $timeout) {
    reduxStore.subscribe(function () {
      $timeout(::$rootScope.$digest)
    })
  })

  .run(function ($rootScope) {
    $rootScope.$watch(function () {
      console.log('ROOT DIGEST')
    })
  })

  .run(function ($filter) { dates.format = $filter('date') })
