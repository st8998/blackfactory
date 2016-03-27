import 'bg_colors/color_picker.css'
import tmpl from 'bg_colors/color_picker_tmpl.slim'
import registerBgColorFilter from 'bg_colors/bg_color_filter'

export default function register() {
  registerBgColorFilter.call(this)
  
  return this.directive('colorPicker', /* @ngInject */ function () {
    return {
      restrict: 'E',
      template: tmpl,
      replace: true,
    }
  })
}
