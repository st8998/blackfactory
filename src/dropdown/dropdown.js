import 'dropdown/dropdown.css'
import $ from 'jquery'

export default function register() {
  return this.directive('dropdown', /* @ngInject */ function ($compile) {
    return {
      restrict: 'A',
      scope: false,
      compile(tEl) {
        const detachedBody = tEl.find('.dropdown__body:first').detach()
        const compiledBody = $compile(detachedBody)

        return function link(scope, el, attrs) {
          const actionButton = el.find('.dropdown__action-button:first')
          const $body = $('body')
          const $document = $(document)

          let childScope
          let linkedBody
          
          function attach() {
            childScope = scope.$new()

            compiledBody(childScope, function (clone) {
              linkedBody = clone

              const buttonOffset = actionButton.offset()
              linkedBody.css({ left: buttonOffset.left, top: 8 + buttonOffset.top + actionButton.height() })

              linkedBody.on('click', scope.$emit.bind(scope, '__preventClose'))

              $body.append(linkedBody)
            })

            if (!scope.$$phase) childScope.$digest()
          }

          function detach() {
            if (linkedBody) linkedBody.remove()
            if (childScope) childScope.$destroy()
          }

          function open() {
            actionButton.addClass('button--active')
            el.prop('dropdown--open', true)
            attach()
          }

          function close() {
            actionButton.removeClass('button--active')
            el.prop('dropdown--open', false)
            detach()
          }

          actionButton.on('click', () => el.prop('dropdown--open') ? close() : open())

          if (attrs.dropdownOpen) setTimeout(open, 0)
          
          // CLOSE BY CLICK OUTSIDE DROPDOWN
          let preventClose
          $document.on('click', function () {
            if (!preventClose) close()
            preventClose = false
          })

          actionButton.on('click', () => preventClose = true)
          scope.$on('__preventClose', () => preventClose = true)
        }
      }
    }
  })
}
