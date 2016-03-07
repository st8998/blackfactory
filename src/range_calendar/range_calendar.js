import 'button/button.css'
import 'calendar/calendar.css'
import 'range_calendar/range_calendar.css'

import tmpl from 'range_calendar/range_calendar_tmpl.slim'

import zone from 'zone'

import { } from 'ramda'
import { noon, isDayBefore } from 'instadate'
import { h, diff, patch, create as createElement } from 'virtual-dom'
import { nextMonth, prevMonth } from 'misc/dates'

import { buildCalendarTree } from 'calendar/calendar'

function noop() {}

export default function register() {
  return this.directive('rangeCalendar', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
      require: ['ngModel'],

      link(scope, el, attrs, [ngModel]) {
        let month = noon(new Date())
        let selected = {}
        let onclick = noop
        let onmouseover = noop

        let rangeCalendarTree
        let rangeCalendarNode

        function buildRangeCalendarTree(events) {
          return h('.range-calendar__months', [
            buildCalendarTree(prevMonth(month), selected, events),
            buildCalendarTree(month, selected, events),
            buildCalendarTree(nextMonth(month), selected, events),
          ])
        }
        
        const rangeCalendarZone = zone.fork({
          afterTask() {
            const newTree = buildRangeCalendarTree({ onclick, onmouseover })
            const patches = diff(rangeCalendarTree, newTree)
            rangeCalendarNode = patch(rangeCalendarNode, patches)
            rangeCalendarTree = newTree
          }
        })

        ngModel.$render = rangeCalendarZone.bind(function () {
          const value = ngModel.$viewValue || {}
          selected = { start: value.start || value.end, end: value.end || value.start }
        })

        rangeCalendarZone.run(function () {
          // ngModel integration
          onclick = function (day) {
            if (onmouseover !== noop) {
              ngModel.$setViewValue(selected)
              onmouseover = noop
              el.removeClass('range-calendar--selecting')
            } else {
              el.addClass('range-calendar--selecting')
              selected = { start: day, end: day }
              const fixedDay = day
              onmouseover = function (day) {
                if (isDayBefore(day, fixedDay)) {
                  selected = { start: day, end: fixedDay }
                } else {
                  selected = { start: fixedDay, end: day }
                }
              }
            }
          }

          rangeCalendarTree = buildRangeCalendarTree({ onclick, onmouseover })
          rangeCalendarNode = createElement(rangeCalendarTree)

          el.find('.months--placeholder').replaceWith(rangeCalendarNode)

          el.on('click', '.calendar__next', function () {
            month = nextMonth(month)
          })

          el.on('click', '.calendar__previous', function () {
            month = prevMonth(month)
          })
        })
      }
    }
  })
}
