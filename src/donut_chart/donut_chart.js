import './donut_chart.css'
import tmpl from './donut_chart_tmpl.slim'

export default function register() {
  return this.directive('donutChart', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
      
      link: function (scope, el, attrs) {
        const maxValue = Number(attrs['maxValue']) || 100

        scope.$watch(attrs['value'], function (value) {
          el.find('.donut-chart__front').css('stroke-dashoffset', String(440 + 12 - Number(value) * 440 / maxValue))
        })
      }
    }
  })
}