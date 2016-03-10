import $ from 'jquery'
import * as d from 'misc/dates'

export default function toHaveExtendedMonthDayNodes(util, customEqualityTesters) {
  return {
    compare(el, _month) {
      const result = {}
      const month = new Date(_month)

      result.pass = util.equals(
        $(el).find('.calendar__day').get().map(node => Number(node.textContent)),
        d.extendedMonthDays(month).map(day => day.getDate()),
        customEqualityTesters)

      if (result.pass) {
        result.message =
          `Expected ${el} not to have day nodes for extended month ${d.format(_month, 'MMMM yyyy')}`
      } else {
        result.message =
          `Expected ${el} to have day nodes for extended month ${d.format(_month, 'MMMM yyyy')}`
      }

      return result
    },
  }
}
