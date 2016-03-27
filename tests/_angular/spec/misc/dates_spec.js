import { nextMonth, prevMonth, extendedMonthDays } from 'misc/dates'

describe('dates', function () {
  it('#nextMonth sets first date of next month', function () {
    expect(nextMonth('2000-01-11')).toHaveSameDay('2000-02-01')
  })

  it('#nextMonth sets first date of 2 next month', function () {
    expect(nextMonth('2000-01-11', 2)).toHaveSameDay('2000-03-01')
  })

  it('#prevMonth sets first date of prev month', function () {
    expect(prevMonth('2000-03-29')).toHaveSameDay('2000-02-01')
  })

  it('#prevMonth sets first date of 3 prev month', function () {
    expect(prevMonth('2000-03-29', 3)).toHaveSameDay('1999-12-01')
  })

  it('#extendedMonthDays returns month days extended to full weeks for march 2016', function () {
    const dates = extendedMonthDays('2016-03-01')

    expect(dates.length).toEqual(35)
    expect(dates[0]).toHaveSameDay('2016-02-29')
    expect(dates[dates.length - 1]).toHaveSameDay('2016-04-03')
  })

  it('#extendedMonthDays returns month days extended to full weeks for may 2016', function () {
    const dates = extendedMonthDays('2016-05-11')

    expect(dates.length).toEqual(42)
    expect(dates[0]).toHaveSameDay('2016-04-25')
    expect(dates[dates.length - 1]).toHaveSameDay('2016-06-05')
  })
})
