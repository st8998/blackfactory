import 'flipping_card/flipping_card.css'

export default function register() {
  return this.directive('flippingCard', /* @ngInject */ function () {
    return {
      restrict: 'A',
      scope: false,
      link(scope, el) {
        const $card = el.find('.flipping-card')

        el.on('click', '.flipping-card__flip-button', $card.toggleClass.bind($card, 'flipping-card--flipped'))
      },
    }
  })
}
