import 'jquery'
import angular from 'angular'

import 'main.css'

import { default as registerCalendar } from 'calendar/calendar'
import { default as registerDropdown } from 'dropdown/dropdown'

angular.module('markup', [])
  ::registerCalendar()
  ::registerDropdown()

