import 'dropdown/dropdown.css'
import $ from 'jquery'

export default function register() {
  return this.directive('dropdown', /* @ngInject */ function () {
    return {
      restrict: 'A',
      link(scope, el, attrs) {
        const actionButton = el.find('.dropdown__action-button:first')
        const body = el.find('.dropdown__body:first')
        const $body = $('body')
        const $document = $(document)

        function reposition() {
          const buttonOffset = actionButton.offset()

          $body.append(body)
          body.css({ left: buttonOffset.left, top: 8 + buttonOffset.top + actionButton.height() })
        }

        function open() {
          actionButton.addClass('button--active')
          body.addClass('dropdown__body--open')
          el.prop('dropdown--open', true)

          reposition()
        }

        function close() {
          actionButton.removeClass('button--active')
          body.removeClass('dropdown__body--open')
          el.prop('dropdown--open', false)
          el.append(body)
        }

        actionButton.on('click', () => el.prop('dropdown--open') ? close() : open())

        let preventClose
        actionButton.add(el.find('.dropdown__body')).on('click', () => preventClose = true)
        $document.on('click', () => {
          if (!preventClose) close()
          preventClose = false
        })

        if (attrs.dropdownOpen) open()
      },
    }
  })
}
