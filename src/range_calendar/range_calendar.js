import 'button/button.css'
import 'calendar/calendar.css'
import 'range_calendar/range_calendar.css'

import preselectFunctionRegister from 'range_calendar/range_calendar_preselect_function'

import tmpl from 'range_calendar/range_calendar_tmpl.slim'

import zone from 'zone'

import $ from 'jquery'
import { forEach } from 'ramda'
import { noon, isDayBefore, isSameDay } from 'instadate'
import { h, diff, patch, create as createElement } from 'virtual-dom'
import { nextMonth, prevMonth, format } from 'misc/dates'

import { buildCalendarTree } from 'calendar/calendar'

function noop() {}

export default function register() {
  preselectFunctionRegister.apply(this, [])

  return this.directive('rangeCalendar', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
      transclude: true,
      require: ['ngModel', 'rangeCalendar'],

      controller() {
        return {
          preselectFunctions: [],
          registerPreselectFunction(title, func) {
            const funcConfig = { title, func }
            this.preselectFunctions.push(funcConfig)
            return funcConfig
          }
        }
      },

      link(scope, el, attrs, [ngModel, ctrl]) {
        scope.ctrl = ctrl
        
        let month = noon(new Date())
        let selected = {}
        let fixedDay
        let onclick = undefined
        let onmouseover = undefined

        let rangeCalendarTree
        let rangeCalendarNode

        let dateViewTree
        let dateViewNode

        function buildRangeCalendarTree(events) {
          return h('.range-calendar__months', [
            buildCalendarTree(prevMonth(month), selected, events),
            buildCalendarTree(month, selected, events),
            buildCalendarTree(nextMonth(month), selected, events),
          ])
        }

        function buildDateViewTree() {
          function selectingClass(date) {
            return !fixedDay || isSameDay(fixedDay, date) ? '' : 'range-calendar__selected-date--selecting'
          }

          return selected.start && selected.end ?
            h('.range-calendar__selected-view', [
              h('span.range-calendar__selected-date.range-calendar__selected-date--start',
                { className: selectingClass(selected.start) }, format(selected.start, 'MMM dd, yyyy')),
              ' — ',
              h('span.range-calendar__selected-date',
                { className: selectingClass(selected.end) }, format(selected.end, 'MMM dd, yyyy'))
            ]) : h('span')
        }
        
        const rangeCalendarZone = zone.fork({
          afterTask() {
            const newTree = buildRangeCalendarTree({ onclick, onmouseover })
            const patches = diff(rangeCalendarTree, newTree)
            rangeCalendarNode = patch(rangeCalendarNode, patches)
            rangeCalendarTree = newTree

            const newTree2 = buildDateViewTree()
            const patches2 = diff(dateViewTree, newTree2)
            dateViewNode = patch(dateViewNode, patches2)
            dateViewTree = newTree2
          }
        })

        ngModel.$render = rangeCalendarZone.bind(function () {
          const value = ngModel.$viewValue || {}
          selected = { start: value.start || value.end, end: value.end || value.start }
        })

        rangeCalendarZone.run(function () {
          ctrl.preselectFunctions = forEach(function (funcConfig) {
            const func = funcConfig.func
            funcConfig.func = function () {
              selected = func(selected)
              ngModel.$setViewValue(selected)
            }
          }, ctrl.preselectFunctions)

          // ngModel integration
          onclick = function (day) {
            if (onmouseover !== undefined) {
              ngModel.$setViewValue(selected)
              onmouseover = undefined
              fixedDay = undefined
              el.removeClass('range-calendar--selecting')

              el.off('click.range-calendar-end-selecting')
              $(document).off('click.range-calendar-end-selecting')
            } else {
              el.addClass('range-calendar--selecting')
              selected = { start: day, end: day }
              fixedDay = day

              el.on('click.range-calendar-end-selecting', '.range-calendar__months', function (e) {
                e.stopPropagation()
              })
              $(document).on('click.range-calendar-end-selecting', function () {
                onmouseover = undefined
                fixedDay = undefined
                el.removeClass('range-calendar--selecting')
                ngModel.$render()
                el.off('click.range-calendar-end-selecting')
                $(document).off('click.range-calendar-end-selecting')
              })

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

          dateViewTree = buildDateViewTree()
          dateViewNode = createElement(dateViewTree)

          el.find('.range-calendar__selected-view--placeholder').replaceWith(dateViewNode)

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
