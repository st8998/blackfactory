import 'button/button.css'
import 'calendar/calendar.css'

import tmpl from 'calendar/calendar_tmpl.slim'

import { map, splitEvery, compose, addIndex } from 'ramda'
import instadate from 'instadate'
import h from 'virtual-dom/h'
import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

export default function register() {
  return this.directive('calendar', /* @ngInject */ function ($filter) {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,

      link(scope, el, attrs) {

        const format = $filter('date')

        const today = instadate.noon(new Date())

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

        scope.month = instadate.noon(new Date())

        const datesNodes = map(function (date) {
          const currMonth = scope.month.getMonth()

          let className = 'calendar__day'

          if (date.getMonth() !== currMonth) {
            className += ' calendar__day--other-month'
          } else if (instadate.isSameDay(date, today)) {
            className += ' calendar__day--today'
          }

          return h('td', { className, key: instadate.isoDateString(date) }, date.getDate())
        })

        const rowNodes = compose(
          map(nodes => h('tr', { key: nodes[0].key }, nodes)),
          splitEvery(7),
          datesNodes,
        )

        function buildCalendarTree (dates) {
          return h('table.calendar__month', [
            h('thead.calendar__head', [
              h('tr', h('th.calendar__month-name', { attributes: { colspan: 7 }, key: instadate.isoDateString(scope.month) }, format(scope.month, 'MMM yyyy'))),
              h('tr.calendar__week-days',
                [h('th', 'Mo'), h('th', 'Tu'), h('th', 'We'), h('th', 'Th'),
                  h('th', 'Fr'), h('th', 'Sa'), h('th', 'Su')]),
            ]),
            h('tbody.calendar__body', { key: instadate.isoDateString(scope.month) }, rowNodes(dates)),
          ])
        }

        el.on('click', '.calendar__next', function () {
          scope.month = instadate.addDays(instadate.lastDateInMonth(scope.month), 2)
          scope.$digest()
        })

        el.on('click', '.calendar__previous', function () {
          scope.month = instadate.addDays(instadate.firstDateInMonth(scope.month), -2)
          scope.$digest()
        })

        let calendarTree = buildCalendarTree(dates(today))
        let calendarNode = createElement(calendarTree)

        scope.$watch('month', function (month, prevMonth) {
          if (month !== prevMonth) {
            const newTree = buildCalendarTree(dates(month))
            const patches = diff(calendarTree, newTree)
            calendarNode = patch(calendarNode, patches)
          } else {
            el.find('.calendar__month--placeholder').replaceWith(calendarNode)
          }
        })
      },
    }
  })
}
