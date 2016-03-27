import { isSameDay, isoDateString } from 'instadate'

export default function toHaveSameDayFactory() {
  return {
    compare(actual, _expected) {
      if (_expected === undefined) throw new Error('You should provide expected value')

      const expected = new Date(_expected)
      const result = {}

      result.pass = isSameDay(actual, expected)

      if (result.pass) {
        result.message =
          `Expected ${isoDateString(actual)} not to equal ${isoDateString(expected)} with accuracy up to a day`
      } else {
        result.message =
          `Expected ${isoDateString(actual)} to equal ${isoDateString(expected)} with accuracy up to a day`
      }

      return result
    },
  }
}
