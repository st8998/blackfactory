export default function register() {
  return this.directive('preventInitialAnimation', /* @ngInject */ function ($animate) {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        const unbindWatch = scope.$watch(attrs['preventInitialAnimation'], function (n, o) {
          if (n && n !== o) {
            $animate.enabled(true, el)
            unbindWatch()
          } else {
            $animate.enabled(false, el)
          }
        })
      },
    }
  })
}
