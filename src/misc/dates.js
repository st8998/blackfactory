import { firstDateInMonth, lastDateInMonth, addDays, dates, isoWeekDay } from 'instadate'

export function extendedMonthDays(_month) {
  const month = new Date(_month)

  let start = firstDateInMonth(month)
  if (isoWeekDay(start) !== 1) start = addDays(start, -isoWeekDay(start) + 1)

  let end = lastDateInMonth(month)
  if (isoWeekDay(end) !== 7) end = addDays(end, 6 - isoWeekDay(end) + 1)

  return dates(start, end)
}

export function nextMonth(_month) {
  const month = new Date(_month)
  return addDays(lastDateInMonth(month), 1)
}

export function prevMonth(_month) {
  const month = new Date(_month)
  return firstDateInMonth(addDays(firstDateInMonth(month), -1))
}
