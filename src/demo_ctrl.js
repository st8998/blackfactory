import { addDays, isoWeekDay } from 'instadate'

export default function register() {
  return this.controller('demoCtrl', /* @ngInject */ function ($scope) {
    $scope.data = {
      date1: new Date('2016-05-11'),
      range1: { start: new Date('2016-03-01'), end: new Date('2016-03-20') }
    }
    
    $scope.currentWeek = function (selection) {
      const today = new Date()

      return { start: addDays(today, -isoWeekDay(today) + 1), end: addDays(today, 7 - isoWeekDay(today)) }
    }
  })
}
