import { always } from 'ramda'

export default function callOnce(onceFunc, alwaysFunc = always()) {
  let called = 0

  return (...args) => called > 0 ? alwaysFunc() : ++called && onceFunc.apply(null, args)
}
