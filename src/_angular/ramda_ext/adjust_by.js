import { adjust, findIndex, curryN } from 'ramda'

/**
 * Applies a function to the value at the index of an array found by index function, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> a) -> (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Function} indexFn The index function.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.adjust
 * @example
 *
 *      R.adjustBy(R.add(10), R.equals(1), [0, 1, 2])     //=> [0, 11, 2]
 *      R.adjustBy(R.add(10))(R.equals(1))([0, 1, 2])     //=> [0, 11, 2]
 */
export default curryN(3, function adjustBy(fn, indexFn, list) {
  const index = findIndex(indexFn, list)
  return adjust(fn, index, list)
})
