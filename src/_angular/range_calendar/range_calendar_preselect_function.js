import tmpl from 'range_calendar/range_calendar_preselect_function_tmpl.slim'
import { firstDateInMonth, lastDateInMonth } from 'instadate'
import { prevMonth } from 'misc/dates'

export default function register() {
  return this.directive('rangeCalendarPreselectFunction', /* @ngInject */ function () {
    const predefinedPreselectFunctions = {
      CURRENT_MONTH: function () {
        const today = new Date()
        return { start: firstDateInMonth(today), end: lastDateInMonth(today) }
      },
      PREVIOUS_MONTH: function () {
        const previousMonth = prevMonth(new Date())
        return { start: firstDateInMonth(previousMonth), end: lastDateInMonth(previousMonth) }
      }
    }

    return {
      restrict: 'E',
      require: ['^rangeCalendar'],
      replace: true,
      template: tmpl,
      scope: true,

      link(scope, el, attrs, [rangeCalendar]) {
        const title = attrs.title
        const func = predefinedPreselectFunctions[attrs.func] || scope.$eval(attrs.func, {})

        scope.funcConfig = rangeCalendar.registerPreselectFunction(title, func)
        console.log(scope.funcConfig)
      },
    }
  })
}
