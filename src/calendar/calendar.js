import 'button/button.css'
import 'calendar/calendar.css'

import tmpl from 'calendar/calendar_tmpl.slim'

import { map, splitEvery, compose } from 'ramda'
import instadate from 'instadate'
import { h, diff, patch, create as createElement } from 'virtual-dom'
import zone from 'zone'

export default function register() {
  return this.directive('calendar', /* @ngInject */ function ($filter) {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
      require: ['ngModel'],

      link(scope, el, attrs, [ngModel]) {
        const format = $filter('date')

        const today = instadate.noon(new Date())
        let month = instadate.noon(new Date())
        let selected = undefined
        let setDate

        function dates(date) {
          let start = instadate.firstDateInMonth(date)
          if (start.getDay() !== 0) {
            start = instadate.addDays(start, -start.getDay())
          }

          let end = instadate.lastDateInMonth(date)
          if (end.getDay() !== 7) {
            end = instadate.addDays(end, 6 - end.getDay())
          }

          return instadate.dates(start, end)
        }

        const datesNodes = map(function (date) {
          const currMonth = month.getMonth()

          let className = 'calendar__day'

          if (date.getMonth() !== currMonth) {
            className += ' calendar__day--other-month'
          } else {
            if (instadate.isSameDay(date, today)) className += ' calendar__day--today'

            if (instadate.isSameDay(date, selected)) className += ' calendar__day--selected'
          }

          return h('td', {
            className, key: instadate.isoDateString(date),
            onclick: setDate.bind(this, date),
          }, date.getDate())
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
            const newTree = buildCalendarTree(dates(month))
            const patches = diff(calendarTree, newTree)
            calendarNode = patch(calendarNode, patches)
            calendarTree = newTree
          },
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

          calendarTree = buildCalendarTree(dates(today))
          calendarNode = createElement(calendarTree)

          el.find('.calendar__month--placeholder').replaceWith(calendarNode)

          el.on('click', '.calendar__next', function () {
            month = instadate.addDays(instadate.lastDateInMonth(month), 2)
          })

          el.on('click', '.calendar__previous', function () {
            month = instadate.addDays(instadate.firstDateInMonth(month), -2)
          })
        })
      },
    }
  })
}
