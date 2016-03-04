import 'spec/misc/dates_spec'

import toHaveSameDay from 'matchers/to_have_same_day'

console.log(toHaveSameDay)

beforeEach(function () {
  jasmine.addMatchers({ toHaveSameDay })
})

