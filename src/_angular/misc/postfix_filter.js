export default function register() {
  return this.filter('postfix', /* @ngInject */ function () {
    return function (val, postfix) {
      return val ? val + postfix : val
    }
  })
}
