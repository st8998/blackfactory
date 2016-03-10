import 'angular-mocks'
import 'angular'

import 'spec/misc/dates_spec'
import 'spec/calendar/calendar_spec'

import toHaveSameDay from 'matchers/to_have_same_day'
import toHaveClass from 'matchers/to_have_class'

beforeEach(function () {
  jasmine.addMatchers({ toHaveSameDay, toHaveClass })
})

