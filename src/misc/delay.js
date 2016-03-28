export default function delay(time) {
  return new Promise(function (fulfill) {
    setTimeout(fulfill, time)
  })
}
