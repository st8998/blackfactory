import './loader.css'

export default function register() {
  return this.directive('loader', /* @ngInject */ function () {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, el, attrs) {
        el.addClass('loader__container')
        
        if (attrs['loaderValue']) {
          const unbindWatch = scope.$watch(attrs['loaderValue'], function (n) {
            if (n) {
              el.removeClass('loader__container--loading')
              unbindWatch()
            } else {
              el.addClass('loader__container--loading')
            }
          })
        }
      }
    }
  })
}
