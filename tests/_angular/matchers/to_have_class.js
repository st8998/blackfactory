export default function toHaveClassFactory() {
  return {
    compare(actual, expected) {
      const result = {}

      result.pass = actual.jquery ? actual.hasClass(expected) : actual.className.match(new RegExp(expected))

      if (result.pass) {
        result.message =
          `Expected ${actual} not to have class ${expected}`
      } else {
        result.message =
          `Expected ${actual} to have class ${expected}`
      }

      return result
    },
  }
}
