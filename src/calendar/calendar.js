import 'button/button.css'
import 'calendar/calendar.css'

import tmpl from 'calendar/calendar_tmpl.slim'

import zone from 'zone'

import { map, splitEvery, compose, merge } from 'ramda'
import { noon, isSameDay, isDayBetween, isoDateString } from 'instadate'
import { h, diff, patch, create as createElement } from 'virtual-dom'
import { nextMonth, prevMonth, extendedMonthDays, format } from 'misc/dates'

export function buildCalendarTree(month, { start, end }, dayEvents) {
  const today = noon(new Date())
  const currMonth = month.getMonth()

  const dayNodes = map(function (day) {
    const bindEvents = map(function (onEvent) {
      return onEvent ? onEvent.bind(this, day) : onEvent
    })

    let className = 'calendar__day'

    if (day.getMonth() !== currMonth) {
      className += ' calendar__day--other-month'
    } else {
      if (isSameDay(day, today)) className += ' calendar__day--today'

      if (start && isSameDay(day, start)) className += ' calendar__day--selected calendar__day--selected-start'
      if (end && isSameDay(day, end)) className += ' calendar__day--selected calendar__day--selected-end'
      if (start && end && isDayBetween(day, start, end)) className += ' calendar__day--selected'
    }

    return h('td', merge({ className }, bindEvents(dayEvents)), day.getDate())
  })

  const monthTable = function (weekRows) {
    return h('table.calendar__month', { key: isoDateString(month) }, [
      h('thead.calendar__head', [
        h('tr', h('th.calendar__month-name', { attributes: { colspan: 7 } }, format(month, 'MMM yyyy'))),
        h('tr.calendar__week-days',
          [h('th', 'Mo'), h('th', 'Tu'), h('th', 'We'), h('th', 'Th'),
            h('th', 'Fr'), h('th', 'Sa'), h('th', 'Su')]),
      ]),
      h('tbody.calendar__body', weekRows),
    ])
  }

  return compose(
    monthTable,
    map(nodes => h('tr', nodes)),
    splitEvery(7),
    dayNodes,
  )(extendedMonthDays(month))
}

export default function register() {
  return this.directive('calendar', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
      require: ['ngModel'],

      link(scope, el, attrs, [ngModel]) {
        let month = noon(new Date())
        let selected = {}
        let setSelected

        let calendarTree
        let calendarNode

        const calendarZone = zone.fork({
          afterTask() {
            const newTree = buildCalendarTree(month, selected, { onclick: setSelected })
            const patches = diff(calendarTree, newTree)
            calendarNode = patch(calendarNode, patches)
            calendarTree = newTree
          }
        })

        ngModel.$render = calendarZone.bind(function () {
          selected = { start: ngModel.$viewValue, end: ngModel.$viewValue }
        })

        calendarZone.run(function () {
          // ngModel integration
          setSelected = function (day) {
            selected = { start: day, end: day }
            ngModel.$setViewValue(day)
          }

          calendarTree = buildCalendarTree(month, selected, { onclick: setSelected })
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
