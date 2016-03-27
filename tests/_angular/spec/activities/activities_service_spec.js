/* global angular */

xdescribe('activitiesService', function () {
  let service
  let scope

  let activity = { id: 1, color: 1, name: 'x', abbr: 'X' }

  beforeEach(function () {
    angular.mock.inject(function (activitiesService, $rootScope, $q) {
      service = activitiesService
      scope = $rootScope
    })
  })

  it('#all selects all activities', function (done) {
    service.all().then(activities => expect(activities).toEqual([])).finally(done)
    scope.$digest()
  })

})
