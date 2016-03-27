import 'bg_colors/bg_colors.css'

export default function register() {
  return this.filter('bgColor', /* @ngInject */ function () {
    return function (value) {
      return `bg-color--${value}`
    }
  })
}
