import 'button/button.css'
import 'calendar/calendar.css'

import tmpl from 'calendar/calendar_tmpl.slim'

import zone from 'zone'

import { map, splitEvery, compose } from 'ramda'
import { noon, isSameDay } from 'instadate'
import { h, diff, patch, create as createElement } from 'virtual-dom'
import { nextMonth, prevMonth, extendedMonthDays } from 'misc/dates'

export default function register() {
  return this.directive('calendar', /* @ngInject */ function ($filter) {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
      require: ['ngModel'],

      link(scope, el, attrs, [ngModel]) {
        const format = $filter('date')

        const today = noon(new Date())
        let month = noon(new Date())
        let selected = undefined
        let setDate

        const datesNodes = map(function (date) {
          const currMonth = month.getMonth()

          let className = 'calendar__day'

          if (date.getMonth() !== currMonth) {
            className += ' calendar__day--other-month'
          } else {
            if (isSameDay(date, today)) className += ' calendar__day--today'

            if (isSameDay(date, selected)) className += ' calendar__day--selected'
          }

          return h('td', { className, onclick: setDate.bind(this, date) }, date.getDate())
        })

        const rowNodes = compose(
          map(nodes => h('tr', nodes)),
          splitEvery(7),
          datesNodes,
        )

        function buildCalendarTree(dates) {
          return h('table.calendar__month', [
            h('thead.calendar__head', [
              h('tr', h('th.calendar__month-name', { attributes: { colspan: 7 } }, format(month, 'MMM yyyy'))),
              h('tr.calendar__week-days',
                [h('th', 'Mo'), h('th', 'Tu'), h('th', 'We'), h('th', 'Th'),
                  h('th', 'Fr'), h('th', 'Sa'), h('th', 'Su')]),
            ]),
            h('tbody.calendar__body', rowNodes(dates)),
          ])
        }

        let calendarTree
        let calendarNode

        const calendarZone = zone.fork({
          afterTask() {
            const newTree = buildCalendarTree(extendedMonthDays(month))
            const patches = diff(calendarTree, newTree)
            calendarNode = patch(calendarNode, patches)
            calendarTree = newTree
          }
        })

        ngModel.$render = calendarZone.bind(function () {
          selected = ngModel.$viewValue
        })

        calendarZone.run(function () {
          // ngModel integration
          setDate = function (date) {
            selected = date
            ngModel.$setViewValue(date)
          }

          calendarTree = buildCalendarTree(extendedMonthDays(today))
          calendarNode = createElement(calendarTree)

          el.find('.calendar__month--placeholder').replaceWith(calendarNode)

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
