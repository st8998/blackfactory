import randomStr from 'randomatic'

export default function register() {
  return this.directive('radiogroup', /* @ngInject */ function () {
    return {
      restrict: 'A',
      require: ['ngModel'],
      scope: true,
      controller() {},

      compile(tEl) {
        tEl.find('input[type="radio"]')
          .attr('radiogroup-radio', 'radiogroup-radio')

        return function link(scope, el, attrs, [ngModel]) {
          const name = randomStr(10)
          el.find('input[type="radio"]').attr('name', name)

          ngModel.$render = function () {
            scope.$evalAsync(function () {
              scope.$broadcast('select-radio', ngModel.$viewValue)
            })
          }

          scope.$on('radio-selected', function (e, value) {
            ngModel.$setViewValue(value)
          })
        }
      },
    }
  }).directive('radiogroupRadio', /* @ngInject */ function () {
    return {
      restrict: 'A',
      require: ['^radiogroup'],
      scope: false,
      link(scope, el, attrs) {
        el.on('click', function () {
          scope.$emit('radio-selected', attrs.value)
        })

        scope.$on('select-radio', function (e, value) {
          el.prop('checked', attrs.value == value)
        })
      }
    }
  })
}
