import { firstDateInMonth, lastDateInMonth, addDays, dates, isoWeekDay, noon } from 'instadate'

export function extendedMonthDays(_month) {
  const month = new Date(_month)

  let start = firstDateInMonth(month)
  if (isoWeekDay(start) !== 1) start = addDays(start, -isoWeekDay(start) + 1)

  let end = lastDateInMonth(month)
  if (isoWeekDay(end) !== 7) end = addDays(end, 6 - isoWeekDay(end) + 1)

  return dates(start, end)
}

export function nextMonth(_month, monthsToSkip = 1) {
  return monthsToSkip === 0 ? _month :
    nextMonth(addDays(lastDateInMonth(new Date(_month)), 1), monthsToSkip - 1)
}

export function prevMonth(_month, monthsToSkip = 1) {
  return monthsToSkip === 0 ? _month :
    prevMonth(firstDateInMonth(addDays(firstDateInMonth(new Date(_month)), -1)), monthsToSkip - 1)
}

export function today() {
  return noon(new Date())
}

export function format() {
  throw new Error('Not implemented')
}
